import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

class OrderModel {
  static async create(orderInfo) {
    const newOrder = await Order.create(orderInfo);
    return newOrder;
  }

  static async findById(orderId) {
    const order = await Order.findOne({ _id: orderId });
    return order;
  }

  static async findAllByUserId(userId) {
    const orders = await Order.find({ userId, deletedAt: null });
    return orders;
  }

  static async findAll() {
    const orders = await Order.find({});
    return orders;
  }

  static async update({ orderId, updateInfo }) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const updatedOrder = await Order.findOneAndUpdate(
      filter,
      updateInfo,
      option,
    );
    return updatedOrder;
  }

  static async softDelete(orderId, updateInfo) {
    const filter = { _id: orderId };
    const result = await Order.findOneAndUpdate(filter, updateInfo);
    return result;
  }

  static async delete(orderId) {
    const result = await Order.deleteOne({ _id: orderId });
    return result;
  }
}

export { OrderModel };
