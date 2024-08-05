module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.body) {
      const words = data.body.split(' ').length;
      data.readTime = Math.ceil(words / 10); // Assuming 10 words per minute
    }
  },
  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.body) {
      const words = data.body.split(' ').length;
      data.readTime = Math.ceil(words / 10); // Assuming 10 words per minute
    }
  },
};
