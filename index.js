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

    // `findAll` asks to retrieve _ALL_ THE CATS!!  An array of `Cat`
    // objects will be returned.
    const cats = await Cat.findAll();

    // Fetch all cats named Markov.
    const cats = await Cat.findAll({
        where: {
            firstName: "Markov",
        },
    });

    // Fetch all cats named either Markov or Curie.
    const cats = await Cat.findAll({
        where: {
            firstName: ["Markov", "Curie"],
        },
    });

    const cats = await Cat.findAll({
        where: {
            firstName: {
                // Op.ne means the "not equal" operator.
                [Op.ne]: "Markov",
            },
        },
    });

    // fetch cats with name != Markov AND age = 4.
    const cats = await Cat.findAll({
        where: {
            firstName: {
                [Op.ne]: "Markov",
            },
            age: 4,
        },
    });

    // fetch cats with name == Markov OR age = 4.
    const cats = await Cat.findAll({
        where: {
            [Op.or]: [{ firstName: "Markov" }, { age: 4 }],
        },
    });

    // Fetch all cats whose age is > 4.
    const cats = await Cat.findAll({
        where: {
            age: { [Op.gt]: 4 },
        },
    });

    //Ordering results
    const cats = await Cat.findAll({
        order: [["age", "DESC"]],
    });

    //Limiting Results
    const cats = await Cat.findAll({
        order: [["age", "DESC"]],
        limit: 1,
    });

    //When we want a max of one result and not in an array!
    const cat = await Cat.findOne({
        order: [["age", "DESC"]],
    });

    // Try to find a non-existant cat with find one will return null instead of an empty array.
    const cat = await Cat.findOne({
        where: {
            firstName: "Franklin Delano Catsevelt",
        },
    });

    await sequelize.close();
}

main();
