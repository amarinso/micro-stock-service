const boom = require('boom');

/**
 * ## `create` operation factory
 *
 * @param {base} Object The microbase object
 * @return {Function} The operation factory
 */
function opFactory(base) {
  /**
   * ## stock.create service
   *
   * Creates a new stock
   */
  const op = {
    name: 'create',
    path: '',
    method: 'POST',
    // TODO: create the stock JsonSchema
    handler: ({productId, warehouseId, quantityInStock, quantityReserved}, reply) => {
      const stockToSave = new base.db.models.Stock({
        productId,
        warehouseId,
        quantityInStock,
        quantityReserved: quantityReserved || 0
      });
      stockToSave.save()
        .then(savedStock => {
          if (base.logger.isDebugEnabled()) base.logger.debug(`[stock] stock set for product ${savedStock.productId}`);
          return reply(savedStock.toClient()).code(201);
        })
        .catch(error => reply(base.utils.genericErrorResponse(error)));
    }
  };

  return op;
}

module.exports = opFactory;
