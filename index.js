const { sequelize, Cat } = require("./models");

async function main() {
    try {
        await sequelize.authenticate();
        console.log("Database connection success!");
        console.log("Sequelize is ready to use");
    } catch (e) {
        console.log("Database connection failure.");
        console.log(e);
        return;
    }

    const cat = await Cat.findByPK(1);
    console.log(cat.toJSON());
    await sequelize.close();
}

main();
