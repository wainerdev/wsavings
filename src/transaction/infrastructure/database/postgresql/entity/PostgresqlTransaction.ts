// import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// interface TransactionAttributes {
//     id: string;
//     userId: string;
//     amount: number;
//     description: string;
//     type: string
// };

// /*
//   We have to declare the AuthorCreationAttributes to
//   tell Sequelize and TypeScript that the property id,
//   in this case, is optional to be passed at creation time
// */
// interface TransactionCreationAttributes
//   extends Optional<TransactionAttributes, 'id'> {}

// interface TransactionInstance
//   extends Model<TransactionAttributes, TransactionCreationAttributes>,
//   TransactionAttributes {
//       createdAt?: Date;
//       updatedAt?: Date;
//     }


//     export const Transaction = Sequelize.define<TransactionInstance>(
//         'Transaction',
//         {
//           id: {
//             allowNull: false,
//             autoIncrement: false,
//             primaryKey: true,
//             type: DataTypes.UUID,
//             unique: true,
//           },
//           firstName: {
//             allowNull: true,
//             type: DataTypes.TEXT,
//           },
//           lastName: {
//             allowNull: false,
//             type: DataTypes.TEXT,
//           },
//           email: {
//             allowNull: true,
//             type: DataTypes.TEXT,
//           },
//         }
//       );