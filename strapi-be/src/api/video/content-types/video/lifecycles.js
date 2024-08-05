const getVideoDurationInSeconds = require('get-video-duration').getVideoDurationInSeconds;

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.video) {
      try {
        const duration = await getVideoDurationInSeconds(data.video.url);
        data.duration = Math.ceil(duration / 60); // 
      } catch (error) {
        console.error('Error getting video duration:', error);
        data.duration = null;
      }
    }
  },
  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.video) {
      try {
        const duration = await getVideoDurationInSeconds(data.video.url);
        data.duration = Math.ceil(duration / 60); // 
      } catch (error) {
        console.error('Error getting video duration:', error);
        data.duration = null;
      }
    }
  },
};
