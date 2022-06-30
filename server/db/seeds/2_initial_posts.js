/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('post').del()
  await knex('post').insert([
    {userid:1, title: 'hello world', content : 'something cool'},
    {userid:1, title: 'More Content', content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictum at tempor commodo ullamcorper. Velit ut tortor pretium viverra suspendisse potenti nullam ac. Ut lectus arcu bibendum at varius vel pharetra. Amet commodo nulla facilisi nullam. Suspendisse in est ante in nibh. Felis donec et odio pellentesque diam volutpat commodo sed egestas. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Tristique risus nec feugiat in fermentum posuere urna. Velit laoreet id donec ultrices tincidunt. Dictum varius duis at consectetur lorem donec massa. Laoreet non curabitur gravida arcu ac tortor dignissim. Elementum curabitur vitae nunc sed velit dignissim sodales. Ac odio tempor orci dapibus ultrices in iaculis. Quisque sagittis purus sit amet. Habitant morbi tristique senectus et. Quis viverra nibh cras pulvinar.'},
    {userid:1, title: 'Example of a longer title right here', content : 'Nunc scelerisque viverra mauris in. Consequat semper viverra nam libero justo laoreet sit. Enim eu turpis egestas pretium. Risus feugiat in ante metus dictum at. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Sapien eget mi proin sed libero enim sed faucibus turpis. Sit amet massa vitae tortor condimentum. In arcu cursus euismod quis viverra nibh cras pulvinar. Montes nascetur ridiculus mus mauris. Amet venenatis urna cursus eget nunc scelerisque. Sed risus pretium quam vulputate dignissim suspendisse. Mattis rhoncus urna neque viverra. Ultricies leo integer malesuada nunc vel risus commodo viverra. Semper risus in hendrerit gravida. Volutpat est velit egestas dui id. Dictumst vestibulum rhoncus est pellentesque elit. Turpis egestas integer eget aliquet nibh praesent tristique magna sit.'}
  ]);
};
