import { Select } from '@mantine/core'
import { IHomeViewModel } from '../HomeViewModel'

type Props = {
  viewModel: IHomeViewModel
}

export function TaskSelect({ viewModel }: Props): JSX.Element {
  return (
    <Select
      data={viewModel.taskNames}
      value={viewModel.selectedTask}
      onChange={viewModel.handleTaskSelection}
      placeholder="Pick a task"
      className="w-full"
      searchable
      autoFocus
      dropdownOpened
    />
  )
}
