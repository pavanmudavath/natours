const fs = require('fs');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({path:'./config.env'});

const DB=process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})
.then(()=>console.log('DB connection sucessful!'));

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`,'utf-8'))

//IMPRORT DATA INTO DB
const importData = async ()=>{
try{
    await Tour.create(tours);
    console.log('Data suceessfully loaded!')
}catch(err){
    console.log(err);
}
};

//DELETE ALL DATA FROM DB
const deleteData = async () =>{
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted!')
    }catch(err){
        console.log(err);
    }
    process.exit();
}

if(process.argv[2]=== '--import'){
    importData();
}else if(process.argv[2]=== '--delete'){
    deleteData();
}



