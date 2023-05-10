const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator=require('validator')

const Sema=mongoose.Schema

const userSchema=new Sema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.statics.register=async function(email,password){


    
    if(!email || !password){

        
        throw Error('Alanlar boş geçilemez')
    }

    if(!validator.isEmail(email)){
        throw Error('Email kurallara uygun değil')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('password yeterince güçlü değil')
    }
    

    const checkUser=await this.findOne({email})

    if(checkUser){
        throw Error('Email zaten kullanılıyor')
    }

    const salt=await bcrypt.genSalt(10)
    const encryptedPassword=await bcrypt.hash(password,salt)

    const user=await this.create({email,password:encryptedPassword})

    

    return user

}



userSchema.statics.login=async function(email,password){

    if(!email || !password){
        throw Error('Alanlar boş geçilemez')
    }


    const user=await this.findOne({email})

    if(!user){
        throw Error('Email bulunamadı')
    }

    const checkPassword=await bcrypt.compare(password,user.password)

    if(!checkPassword){
        throw Error('Hatalı password girdiniz')
    }


    return user


}


module.exports=mongoose.model('user',userSchema)
