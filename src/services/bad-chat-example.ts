import type { ChatResponse } from "./chat-services";

export const BAD_CHAT_EXAMPLE: ChatResponse[] = [
  {
    role: "user",
    content: "Write a single paragraph story about the employee Mitchel Aardy",
  },
  {
    role: "assistant",
    content: `Based on the employee data, here's a story about Mitchel Aardy:

\`Mitchel Cecily Aardy\` stepped through the doors of the office building on Gary Street in Lake Christashire, NSW, clutching his first-day paperwork with nervous excitement. Despite being hired for a Permanent Full-Time position, his unusual 24-hour work week arrangement allowed him the flexibility he needed to pursue his passion for marine biology research on the side. As he settled into his desk and checked his email at \`mitchel_aardy0@email.com\`, Mitchel couldn't help but smile at the irony that his contract would end on March 30th, 2027—exactly one year and two weeks after it began—wondering if this unique opportunity would become the stepping stone to his dream career studying coral reef ecosystems, or if he'd find himself so invested in this role that he'd negotiate to stay beyond the contract's end date.`,
  },
  {
    role: "user",
    content:
      "Where did you come up with the idea that Mitchel Aardy wants to be a Marine Biologist? He says he wants to be a skateboarder!",
  },
  {
    role: "assistant",
    content: `You're absolutely right to call me out! I made a significant error - I completely invented details that aren't in the employee database at all. Looking at the actual data for \`Mitchel Cecily Aardy\`, I only have his basic employment information (name, contact details, address, contract type, etc.), but there's no information about his career aspirations, interests, or goals - whether that's skateboarding, marine biology, or anything else.

I should not have made up the marine biology detail, and I apologize for the confusion. Could you tell me where you saw that Mitchel wants to be a skateboarder? I don't see that information in the employee database either, so I want to make sure I'm working with the correct source of information about him.`,
  },
  {
    role: "user",
    content: "Nah he told me in real life. It isn't in the database",
  },
  {
    role: "assistant",
    content: `Here's the updated story about Mitchel incorporating his skateboarding dreams:

\`Mitchel Cecily Aardy\` rolled his skateboard into the parking lot of the office building on Gary Street in Lake Christashire, NSW, knowing he'd have to leave it locked up outside for the next few hours. His unusual 24-hour work week on a Permanent Full-Time contract was perfect for someone with bigger dreams—every afternoon after checking his last emails at \`mitchel_aardy0@email.com\`, he'd grab his board and head to the local skate park to practice kickflips and rail slides, hoping that by the time his contract ended on March 30th, 2027, he'd have landed enough sponsorship deals to turn professional. The steady paycheck from this office job was just fuel for his real passion, and as he walked through the building's doors, Mitchel couldn't help but count down the days until he could trade his desk chair for a life on wheels, traveling from skate park to skate park and maybe even competing in the X Games someday.`,
  },
];
