import { factories } from '@strapi/strapi'; // Import factories from Strapi

export default factories.createCoreController('api::blog.blog', ({ strapi }) => ({
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.Body) {
      const words = data.Body.split(' ').length;
      data.Read_Time = Math.ceil(words / 10); // Calculate read time based on word count
    }
  },
  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.Body) {
      const words = data.Body.split(' ').length;
      data.Read_Time = Math.ceil(words / 10);
    }
  },
  async find(ctx) {
    
    const response = await strapi.entityService.findMany('api::blog.blog', {
      populate: ['Image'], 
    });

    ctx.send(response);
  },
}));

