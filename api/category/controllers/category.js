'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
 const { sanitizeEntity } = require('strapi-utils');


module.exports = {
 
    async findOne(ctx) {
        const { slug } = ctx.params;
    
        const entity = await strapi.services.category.findOne({ slug });
        console.log(entity.section)
        return sanitizeEntity(entity, { model: strapi.models.category });
      },
     async findSection(ctx){
       const {slug, section}=ctx.params;
       const entity = await strapi.query('section').findOne({'slug':section , 'category.slug':slug});
       return sanitizeEntity(entity, { model: strapi.models.section });


     },


     async findTopic(ctx){
      const { slug  , section, topic} = ctx.params;

      if(!slug || !section || !topic)
      {
        ctx.send('Bad Request');
      }
      else{
        try {

          
      const sectionSlug = await strapi.query('section').findOne({'slug':section , 'category.slug':slug });
     
      const categoryID = await strapi.services.category.findOne({ slug });
      const entity = await strapi.query('topic').findOne({'slug': topic , 'section.slug': sectionSlug.slug , 'section.category':categoryID.id });
      console.log({entity} )
     

      return sanitizeEntity(entity, { model: strapi.models.topic });
          
        } catch (e) {
          console.log(e)
          ctx.send(e)
          
        }
      }

     },
      

};
