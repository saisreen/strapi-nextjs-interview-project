import { factories } from '@strapi/strapi'; // Import factories from Strapi
import getVideoDurationInSeconds from 'get-video-duration'; // 

export default factories.createCoreController('api::video.video', ({ strapi }) => ({
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.Video) {
      // Calculate video duration if needed
      data.Duration = await getVideoDurationInSeconds(data.Video.url);
    }
  },
  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.Video) {
      data.Duration = await getVideoDurationInSeconds(data.Video.url);
    }
  },
  async find(ctx) {
    
    const response = await strapi.entityService.findMany('api::video.video', {
      populate: ['Video'],
    });

    ctx.send(response);
  },
}));
