class Config {

}

class DevelopmentConfig extends Config {
    vacationsAdminUrl = 'http://localhost:3001/api/admin/vacations/';

    registerUrl = 'http://localhost:3001/api/auth/register/';
    loginUrl = 'http://localhost:3001/api/auth/login/';

    userVacationsUrl = 'http://localhost:3001/api/user-vacations/' 

    vacationsImageUrl = 'http://localhost:3001/vacations/images/'

    followersUrl = 'http://localhost:3001/api/followers/'

    // for graph: 
    victoryFollowersCount = 'http://localhost:3001/api/admin/followers-count/'

    socketUrl = 'http://localhost:3001/'
}

class ProductionConfig extends Config {
    vacationsAdminUrl = 'https://vacationsbyjack.herokuapp.com/api/admin/vacations/';

    registerUrl = 'https://vacationsbyjack.herokuapp.com/api/auth/register/';
    loginUrl = 'https://vacationsbyjack.herokuapp.com/api/auth/login/';

    userVacationsUrl = 'https://vacationsbyjack.herokuapp.com/api/user-vacations/'  

    vacationsImageUrl = 'https://vacationsbyjack.herokuapp.com/vacations/images/'

    followersUrl = 'https://vacationsbyjack.herokuapp.com/api/followers/'

    // for graph: 
    victoryFollowersCount = 'https://vacationsbyjack.herokuapp.com/api/admin/followers-count/'

    socketUrl = 'https://vacationsbyjack.herokuapp.com/'

}

const config = process.env.NODE_ENV === 'development' ? new DevelopmentConfig() : new ProductionConfig()

export default config