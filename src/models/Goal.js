import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'timesheetApp.db' });

export async function deleteGoalById(id)  {            
    console.log(id, "delete id")
        db.transaction(async tx => {            
            await tx.executeSql('delete from table_goal where id = ?',
                [id], async (tx, res) => {                    
                   await console.log(res, "excuted success")
                   return true
                },
                async (tx, err) => {                    
                    console.log(tx)
                    return false
                })
        })    
}