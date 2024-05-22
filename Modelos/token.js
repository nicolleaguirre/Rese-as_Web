module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {
        usuarioID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expiry: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {});

    Token.invalidate = async function (token) {
        const tokenRecord = await this.findOne({ where: { token } });
        if (tokenRecord) {
            await tokenRecord.destroy();
        }
    };

    Token.associate = models => {
        Token.belongsTo(models.User, { foreignKey: 'usuarioID' });
    };

    return Token;
};