import { Select } from '@mantine/core'
import { IHomeViewModel } from '../HomeViewModel'

type Props = {
  viewModel: IHomeViewModel
}

export function TaskSelect({ viewModel }: Props): JSX.Element {
  return (
    <Select
      data={viewModel.taskNames} // Set the task names as options
      value={viewModel.selectedTask}
      onChange={viewModel.handleTaskSelection}
      placeholder="Pick a task"
      className="w-full"
      autoFocus // Automatically focus the Select when it is shown
      dropdownOpened // Ensure the dropdown is opened when the Select is rendered
    />
  )
}
