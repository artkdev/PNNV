import { ActionMeta, GroupBase, OptionsOrGroups } from "react-select"

export type SelectType = {
  options?: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined
  onChange?: ((newValue: unknown, actionMeta: ActionMeta<unknown>) => void) | undefined
}
