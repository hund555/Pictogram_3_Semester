
import type Task from "./Task"

class TaskList {
    Tasks: Task[] = new Array<Task>;
    private listeners: (() => void)[] = []
    

    set(tasks:Task[]) {
        this.Tasks = tasks;
        this.sort()
    }


    addOne = (task: Task) => {
        this.Tasks.push(task);
         this.sort()
        
        
    }
     addMany = (tasks: Task[]) => {
        this.Tasks.push(...tasks);
         this.sort();
        
        
    }
     remove = (index: number)=> {

        this.Tasks.splice(index, 1);
         this.Tasks.forEach((task) => { if (task.index > index) index--; })
        this.sort();
        


    }
    onChange(fn: () => void) {
        this.listeners.push(fn)
    }
    /*    Replace a Tasks index and Resorting the Array
        The Method checks if the task at the index (newIndex) is null. if so, it set the new index number. If there is an object on that position it automaticly shifts up all aftercomming items by 1
        Attributes:   
            tasklist<TaskList>  the List, where tasks are stored, 
            oldIndex <Number>   what item is to be moved,
            newIndex <Number>   what index the number shall get
    */
    /* moveToNewIndex = (oldIndex: number, newIndex: number)=> {
        if (!this.verifyTask) return;
         if (oldIndex == 0 && newIndex < oldIndex) return;
         if (oldIndex == this.Tasks.length && newIndex > oldIndex) return;
        //presort
        this.sort();
        //verify the index numbers are conitnuous


        //perform the shift
        //  wholefiller 
        if (this.verifyIndex()) {
            if (oldIndex < newIndex) {
                this.Tasks.forEach((task) => {
                    if (task.index == oldIndex) { task.index = newIndex - 1 }
                    if (task.index > oldIndex && task.index < newIndex) {
                        task.index--;
                    }

                })
            }

            if (oldIndex > newIndex) {
                this.Tasks.forEach((task) => {

                    if (task.index < oldIndex && task.index > newIndex) {
                        task.index--;
                    }
                    if (task.index > oldIndex) { task.index--; }
                    if (task.index == oldIndex) { task.index = newIndex - 1 }
                })
            }
        }

        this.sort()
        

    }*/
    moveUp = (index: number)=> {
        if (!this.verifyTask() || !this.verifyIndex() || index == 0) return;
        this.Tasks[index].index = index - 1
        this.Tasks[index - 1].index = index;
        this.sort();
    }

    moveDown = (index: number) => {
        if (!this.verifyTask() || !this.verifyIndex() || index == this.Tasks.length -1) return;

        this.Tasks[index].index = index + 1 ;
        this.Tasks[index + 1].index = index;
        this.sort();


    }

     sort = () => {

        this.Tasks.sort((a, b) => a.index - b.index);

         this.emit()
    }


    clear = () => {
        this.Tasks = new Array<Task>;
    }
    private  verifyIndex = (): boolean => {
        let checksum = 0;
        this.sort();
        for (let i = 0; i < this.Tasks.length; i++) {
            if (this.Tasks[i].index == i) { checksum++; }
        }
        if (checksum == this.Tasks.length) { return true; }
        return false;

    }
    private  verifyTask = (): boolean => {
        if (!this.Tasks || this.Tasks.length == 0) return false;
        let checksum = 0;
        this.Tasks.forEach((task) => { if (task) checksum++; });
        if (checksum == this.Tasks.length) return true;
        return false;
    }
    private emit() {
        for (const fn of this.listeners) fn();
    }
}
export const Tasklist = new TaskList()









/*     const buffer: Task = this.Tasks[index + 1];
     buffer.index = buffer.index - 1;
     this.Tasks[index].index = index + 1;
     this.Tasks[index + 1] = this.Tasks[index];
     this.Tasks[index] = buffer;
     this.emit()*/









        /*const buffer: Task = this.Tasks[index - 1];
        buffer.index = buffer.index + 1;
        this.Tasks[index].index = index - 1;
        this.Tasks[index - 1] = this.Tasks[index];
        this.Tasks[index] = buffer;
        this.emit()*/
 