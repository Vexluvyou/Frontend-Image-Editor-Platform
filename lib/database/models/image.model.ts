// import { DataTypes, Model, Optional } from 'sequelize';
// import sequelize from '../config/database'; // your Sequelize instance

// // Define TypeScript interface for Image attributes
// export interface ImageAttributes {
//   id: number;
//   title: string;
//   transformationType: string;
//   publicId: string;
//   secureURL: string;
//   width?: number;
//   height?: number;
//   transformationUrl?: string;
//   aspectRatio?: string;
//   color?: string;
//   prompt?: string;
//   authorId: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// // Optional fields for creation
// interface ImageCreationAttributes extends Optional<ImageAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// // Define the Sequelize Model
// class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
//   public id!: number;
//   public title!: string;
//   public transformationType!: string;
//   public publicId!: string;
//   public secureURL!: string;
//   public width?: number;
//   public height?: number;
//   public transformationUrl?: string;
//   public aspectRatio?: string;
//   public color?: string;
//   public prompt?: string;
//   public authorId!: string;

//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// Image.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     title: { type: DataTypes.STRING, allowNull: false },
//     transformationType: { type: DataTypes.STRING, allowNull: false },
//     publicId: { type: DataTypes.STRING, allowNull: false },
//     secureURL: { type: DataTypes.STRING, allowNull: false },
//     width: { type: DataTypes.INTEGER, allowNull: true },
//     height: { type: DataTypes.INTEGER, allowNull: true },
//     transformationUrl: { type: DataTypes.STRING, allowNull: true },
//     aspectRatio: { type: DataTypes.STRING, allowNull: true },
//     color: { type: DataTypes.STRING, allowNull: true },
//     prompt: { type: DataTypes.STRING, allowNull: true },
//     authorId: { type: DataTypes.STRING, allowNull: false },
//   },
//   {
//     sequelize,
//     modelName: 'Image',
//     tableName: 'images',
//     timestamps: true,
//   }
// );

// export default Image;


import { Document, Schema, model, models } from "mongoose";

export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string; 
  width?: number;
  height?: number;
  config?: object; 
  transformationUrl?: string; 
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  }
  createdAt?: Date;
  updatedAt?: Date;
}

const ImageSchema = new Schema({
  title: { type: String, required: true },
  transformationType: { type: String, required: true },
  publicId: { type: String, required: true },
  secureURL: { type: String, required: true },
  width: { type: Number },
  height: { type: Number },
  // config: { type: Object },
  transformationUrl: { type: String },
  aspectRatio: { type: String },
  color: { type: String },
  prompt: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Image = models?.Image || model('Image', ImageSchema);

export default Image;