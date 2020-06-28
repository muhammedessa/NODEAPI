const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log('Connected !'))
.catch((e)=>console.error('Failed !' + e));
 

const employeeSchema = new mongoose.Schema({
    name: { type:String , required:true ,trim:true }, 
    age: { type: Number, min: [24, 'too small age'], max: 60 },
    department:{
         type: Array ,
         validate:{
             validator: function (params) {
                 return params.length > 0
             },
             message : 'You must choose a department'
         }
        }, 
    job:{
        type: String,
        enum:['IT', 'HR', 'Sales'],
        required:true
    },
    date: { type: Date, default: Date.now },
    isApproved: Boolean,
    salary:{
        type: Number,
        required:function () {
            return this.isApproved;
        }
    }
});

const Employee  = mongoose.model('Employee' ,employeeSchema) ;


async function createEmployee() {
    const muhammed = new Employee({
        name: '     Salah HASSAN Yousif     ',
        age: 44,
        department: [ 'iOS Developer'  ], 
        isApproved: false,
        job: 'IT',
        salary: 3000
    })

    try {
        const result =  await  muhammed.save(); 
        console.log(result)
    } catch (error) {
  console.log(error.message) 
     //   console.log("name is required")
    } 
}

createEmployee() ;
// lte , gte 
// lt , gt
//eq
//in  nin
async function getEmployees() {
    const employees = await Employee
 //   .find({name: 'Muhammed Essa Hameed',age: 36})
     .find({ age: {$nin :[33 ]}})
    .sort({name: 1})
    .select({name: 1 , age:1})
    .limit(20)
    console.log(employees)
}

//getEmployees();

async function updateEmployee(id) {
    const employee = await Employee.findById(id);
    if (!employee) {
        return  console.log("Employee not found !")
    }
    employee.age = 44
   const result =  await employee.save();
   console.log(result + 'Updated successfully ! ')
}


//updateEmployee('5edd0b83b729a447859db87c') 


async function update2Employee(id) {
    const employee = await Employee.update({_id: id} , {
        $set:{
           age : 55 
        }
    }); 
   
   console.log(employee + 'Updated successfully ! ')
}


async function update3Employee(id) {
    const employee = await Employee.findByIdAndUpdate(  id  , {
        $set:{
            name: 'Ali Omer Salim',
           age : 55 
        }
    } , {new:true}); 
   
   console.log(employee + 'Updated successfully ! ')
}

//update3Employee('5edd0c3888b1d2479e8b3dea')



async function deleteEmployee(id) {
   //const employee = await Employee.deleteMany(  {_id: id}  ); 
   const employee = await Employee.findByIdAndRemove(  id ); 
   console.log(employee + 'Deleted successfully ! ')
}



 //deleteEmployee('5edd23d44fbea84a37c2f13d')