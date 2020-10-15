"use strict";
module.exports = (sequelize, DataTypes) => {
    const Cat = sequelize.define(
        "Cat",
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "firstName must not be null",
                    },
                    notEmpty: {
                        msg: "firstName must not be empty",
                    },
                    len: {
                        args: [0, 8],
                        msg:
                            "firstName must not be more than eight letters long",
                    },
                },
            },
            specialSkill: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "specialSkill must not be null",
                    },
                    notEmpty: {
                        msg: "specialSkill must not be empty",
                    },
                    isIn: {
                        args: [["jumping", "sleeping", "purring"]],
                        msg:
                            "specialSkill must be either jumping, sleeping, or purring",
                    },
                },
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "age must not be null",
                    },
                    min: {
                        args: [0],
                        msg: "age must not be less than zero",
                    },
                    max: {
                        args: [99],
                        msg: "age must not be greater than 99",
                    },
                },
            },
        },
        {}
    );
    Cat.associate = function (models) {
        // associations can be defined here
    };
    return Cat;
};
