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

    // Constructs an instance of the JavaScript `Cat` class. **Does not
    // save anything to the database yet**. Attributes are passed in as a
    // POJO.
    const cat = Cat.build({
        firstName: "Markov",
        specialSkill: "sleeping",
        age: 5,
    });
    // This actually creates a new `Cats` record in the database. We must
    // wait for this asynchronous operation to succeed.
    await cat.save();

    //Fetch the cat with id #1
    const cat = await Cat.findByPK(1);
    console.log(cat.toJSON());

    // The Cat object is modified, but the corresponding record in the
    // database is *not* yet changed at all.
    cat.specialSkill = "super deep sleeping";
    // Only by calling `save` will the data be saved.
    await cat.save();

    // Remove the Markov record.
    await cat.destroy();

    //Builds and saves in one step
    const cat = await Cat.create({
        firstName: "Curie",
        specialSkill: "jumping",
        age: 4,
    });

    // Destroy the Cat record with id #3.
    await Cat.destroy({ where: { id: 3 } });

    await sequelize.close();
}

main();
