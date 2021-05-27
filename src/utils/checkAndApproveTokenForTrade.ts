import { BigNumber } from "@ethersproject/bignumber"
import { ContractReceipt } from "ethers"
import { ContractTransaction } from "@ethersproject/contracts"
import { Erc20 } from "../../types/ethers-contracts/Erc20"
import { LpTokenGuarded } from "../../types/ethers-contracts/LpTokenGuarded"
import { LpTokenUnguarded } from "../../types/ethers-contracts/LpTokenUnguarded"
import { MaxUint256 } from "@ethersproject/constants"
import { Zero } from "@ethersproject/constants"
/**
 * Checks if a spender is allowed to spend some amount of a token.
 * Approves them to spend if they're not already allowed.
 * Won't make requests if spendingValue eq 0
 * @param {Contract} srcTokenContract
 * @param {string} swapAddress
 * @param {string} spenderAddress
 * @param {BigNumber} spendingValue
 * @param {boolean} infiniteApproval
 * @param {{}} callbacks
 * @return {Promise<void>}
 */
export default async function checkAndApproveTokenForTrade(
  srcTokenContract: Erc20 | LpTokenGuarded | LpTokenUnguarded,
  swapAddress: string,
  spenderAddress: string,
  spendingValue: BigNumber, // max is MaxUint256
  infiniteApproval = false,
  callbacks: {
    onTransactionStart?: (
      transaction?: ContractTransaction,
    ) => (() => void) | undefined
    onTransactionSuccess?: (transaction: ContractReceipt) => () => void
    onTransactionError?: (error: Error | string) => () => void
  } = {},
): Promise<void> {
  if (srcTokenContract == null) return
  if (spendingValue.eq(0)) return

  let tokenName
  if (swapAddress == "0xe29eFb8D9a3499e25521705c17b10FA4B390A27c") {
    tokenName = "OIKOS-LP"
  } else {
    tokenName = await srcTokenContract.name()
  }

  const existingAllowance = await srcTokenContract.allowance(
    spenderAddress,
    swapAddress,
  )
  console.log(
    `Existing ${tokenName} Allowance: ${existingAllowance.toString()} ${infiniteApproval} ${existingAllowance.gte(spendingValue)} ${ existingAllowance.eq(MaxUint256)}`,
  )

  if (!infiniteApproval && existingAllowance.eq(MaxUint256)) {
    console.log(`Resetting infinite approval`)
    await approve(Zero)
  }

  if (infiniteApproval && existingAllowance.lt(MaxUint256)) {
    console.log(`Enabling infinite approval`)
    await approve(MaxUint256)
  }

  //if (existingAllowance.gte(spendingValue) && !infiniteApproval) return

  async function approve(amount: BigNumber): Promise<void> {
    try {
      const cleanupOnStart = callbacks.onTransactionStart?.()
      const approvalTransaction = await srcTokenContract.approve(
        swapAddress,
        amount,
      )
      const confirmedTransaction = await approvalTransaction.wait()
      cleanupOnStart?.()
      callbacks.onTransactionSuccess?.(confirmedTransaction)
    } catch (error) {
      callbacks.onTransactionError?.(error)
      throw error
    }
  }
  if (existingAllowance.gt("0")) {
    // Reset to 0 before updating approval
    await approve(Zero)
  }
  await approve(infiniteApproval ? MaxUint256 : spendingValue)
  console.debug(`Approving ${tokenName} spend of ${spendingValue.toString()}`)
}
