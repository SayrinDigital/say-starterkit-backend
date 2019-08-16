'use strict'

const Role = use('App/Models/Role')
class RoleController {

    async store({ request, response }){

        const roleInfo = request.only(['role_name'])
        const roleExists = await Role.findBy('role_name', roleInfo.role_name)

        if(roleExists){
            return response.status(409).json({ message: 'El rol ya existe' })
        }else{

            const role = new Role()
            role.role_name = roleInfo.role_name

            await role.save()
            return response.status(201).json(role)
        }

    }

}

module.exports = RoleController
