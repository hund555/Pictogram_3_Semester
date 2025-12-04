using System.Windows.Input;

namespace WPF_PictoPlanner_Admin.Commands
{
    /// <summary>
    /// A command to relay its functions 
    /// </summary>
    public class RelayCommand : ICommand
    {
        public event EventHandler? CanExecuteChanged;

        public bool CanExecute(object? parameter)
        {
            throw new NotImplementedException();
        }

        public void Execute(object? parameter)
        {
            throw new NotImplementedException();
        }
    }
}
