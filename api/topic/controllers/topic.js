'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
 const { sanitizeEntity } = require('strapi-utils');

module.exports = {

    async findOne(ctx) {
        const { slug  , section, category} = ctx.params;

       const ID = await strapi.query('category').findOne({slug:category});
        console.log({ID} )
        const entity = await strapi.services.topic.findOne({'slug': slug ,'section.slug':section , 'section.category':ID.id  });
        console.log({entity} )
       

        return sanitizeEntity(entity, { model: strapi.models.topic });
      },

};
