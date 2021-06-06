import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin',
        email: 'admin@him.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Jhon',
        email: 'jhon@him.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Doe',
        email: 'doe@him.com',
        password: bcrypt.hashSync('123456', 10)
    },
]

export default users