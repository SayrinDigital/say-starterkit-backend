'use strict'

const User = use('App/Models/User')
const Role = use('App/Models/Role')
class UserController {

    async login ({ request, response, auth }) {
        const { email, password } = request.all()

        try{
            if(await auth.attempt(email, password)){
                let user = await User.findBy('email', email)
                let token = await auth.generate(user)

                Object.assign(user, token)
                return response.json(user)
            }
        }catch(e){
            console.log(e)
            return response.status(404).json({ message: 'No te encuentras registrado!' })
        }

        return 'Logged in successfully'
    }

    async register({ request, auth, response }){

        //Check if ROLE_USER exists before inserting the new user
        let role = await Role.findBy('role_name', 'ROLE_USER')

        // Create the basic ROLE_USER in case it doesn't exists
        if(!role){
            role = new Role()
            role.role_name = 'ROLE_USER'
            await role.save()
        }

        let user = await User.create(request.all())
        user.role = role
        //generate token for user;
        let token = await auth.generate(user)
        Object.assign(user, token)

        return response.json(user)
    }

    async show ({ auth, response }) {
        try {
          return await auth.getUser()
        } catch (error) {
          response.json({ data: 'Missing or invalid jwt token' })
        }
    }

    async update({ params, request, response }){
        const userInfo = request.all()
        const user = await User.find(params.id)

        user.email = userInfo.email
        await user.save()
        return response.status(200).json(user)
    }

    async logout({ auth }){
        await auth.logout()
    }

}

module.exports = UserController
