"use strict";
module.exports = (sequelize, DataTypes) => {
    const Cat = sequelize.define(
        "Cat",
        {
            firstName: DataTypes.STRING,
            specialSkill: DataTypes.STRING,
            age: DataTypes.INTEGER,
        },
        {}
    );
    Cat.associate = function (models) {
        // associations can be defined here
    };
    return Cat;
};
