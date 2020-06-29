const fakeMovements = [
  {
    id: 1,
    imageUrl: 'https://assets.change.org/photos/0/la/lt/mylaLTYqhScqWHI-800x450-noPad.jpg?1590516227',
    name: 'Justice for George Floyd',
    location: 'Minneapolis, MN',
    description: `
      George Floyd was murdered by a Minneapolis police officer.

      George was handcuffed and restrained and being completely cooperative when this all went down. The officer put his knee on George’s neck choking him for minutes on minutes while George screamed that he could not breathe. Bystanders beg for the police officer to take his knee off George’s neck, but the officer didn’t listen and continued to choke him.

      Not that it would matter at all, but George was not even wanted for a violent crime. A grocery store that he was signing a bad check. 

      We are trying to reach the attention of Mayor Jacob Frey and DA Mike Freeman to beg to have the officers involved in this disgusting situation fired and for charges to be filed immediately.

      Please help us get justice for George and his family!
    `,
    followers: 10000,
    emailsSent: 10,
  },
  {
    id: 2,
    imageUrl: 'https://assets.change.org/photos/5/tg/gk/uNtGGkZoxgRnuuz-800x450-noPad.jpg?1589086374',
    name: 'Justice for Breonna Taylor',
    location: 'Louisville, KY',
    description: `
      Breonna Taylor was an award-winning EMT and model citizen. She loved her family and community. She worked at two hospitals as an essential worker during the pandemic.

      One month ago, a division of the Louisville Police Department performed an illegal, unannounced drug raid on her home. Not a single officer announced themselves before ramming down her door and firing 22 shots, shooting Breonna 8 times, killing her. 

      Not only were the police at the WRONG HOUSE, but the man they were looking for had already been arrested earlier that day.
    `,
    followers: 1000,
    emailsSent: 100,
  },
  {
    id: 3,
    imageUrl: 'https://assets.change.org/photos/0/be/bh/PxBebHLEVjesKqr-800x450-noPad.jpg?1585108503',
    name: 'Hazard pay for all USPS EMPLOYEES!!',
    location: 'Washington D.C.',
    description: `
      As we get deeper and deeper into this Coronavirus epidemic postal employees are being forced to work and do overtime upwards of 12 hours a day. As of this present time there have been Upwards of more than 40 confirmed cases of coronavirus with-in the United States Postal Service. From dealing with the day-to-day struggles of rain, sleet snow, hail or no AC in postal vehicles limited heating in postal vehicles no innovations in carriers delivery methods no innovations in protection clothing or any other areas of the post office.

      Megan Brennan USPS CEO hasn’t sent any supplies such as had sanitizer or mask for employees protection, she made a very vague statement which basically read her employees should follow CDC guidelines. Blood, sweat, and tears postal employees carrier this company on their backs day in and day out at the expense of time with our families, wear and tear on our bodies, mental and emotional abuse from USPS management.
    `,
    followers: 100,
    emailsSent: 1000,
  },
];

const fakeUsers = [
  {
    id: 1,
    username: 'krazyKris',
    password: 'hehe',
    firstName: 'Kris',
    lastName: 'Mason',
    location: 'New Orleans, LA',
    email: 'kris@gmail.com',
    phoneNumber: '111-123-4567',
    imageUrl: 'https://miro.medium.com/max/3150/0*DvXPY79aqDQoMRvu.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
  },
  {
    id: 2,
    username: 'craftyClayton',
    password: 'hoho',
    firstName: 'Clayton',
    lastName: 'Christenson',
    location: 'Dallas, TX',
    email: 'clayton@gmail.com',
    phoneNumber: '222-123-4567',
    imageUrl: 'https://sloanreview.mit.edu/wp-content/uploads/2020/02/MAG-Christensen-1290x860.jpg',
    bio: 'bio for craftyClayton',
  },
  {
    id: 3,
    username: 'niftyNeisha',
    password: 'haha',
    firstName: 'Neisha',
    lastName: 'Rose',
    location: 'New York, NY',
    email: 'neisha@gmail.com',
    phoneNumber: '333-123-4567',
    imageUrl: 'https://secure.img1-fg.wfcdn.com/im/00553075/compr-r85/7108/71085402/roses-floral-arrangement-in-vase.jpg',
    bio: 'bio for niftyNeisha',
  },
  {
    id: 4,
    username: 'wilyWill',
    password: 'hihi',
    firstName: 'Will',
    lastName: 'Preble',
    location: 'Los Angeles, TX',
    email: 'will@gmail.com',
    phoneNumber: '444-123-4567',
    imageUrl: 'https://athletics.bethel.edu/images/2015/11/12/i_ZB4v5RL_X3.jpg?width=300',
    bio: 'bio for wilyWill',
  },
];

export {
  fakeMovements,
  fakeUsers,
};
