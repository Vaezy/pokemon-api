export default (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le nom ne peut pas être vide." },
          notNull: { msg: "Le nom est requis." },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: [0], msg: "Les points de vie doivent être >= 0." },
          max: { args: [999], msg: "Les points de vie doivent être <= 999." },
          isInt: { msg: "Utilisez uniquement des nombres entiers." },
          notNull: { msg: "Les points de vie sont requis." },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: [0], msg: "Les points de dégâts doivent être >= 0." },
          max: { args: [99], msg: "Les points de dégâts doivent être <= 99." },
          isInt: { msg: "Utilisez uniquement des nombres entiers." },
          notNull: { msg: "Les points de dégâts sont requis." },
        },
      },
      picture: { type: DataTypes.STRING, allowNull: false },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join(","));
        },
      },
    },
    { timestamps: true, createdAt: "created", updatedAt: false },
  );
};
