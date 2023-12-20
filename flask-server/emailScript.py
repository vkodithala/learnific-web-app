from openai import OpenAI

class NewsletterAssistant:
    def __init__(self, api_key, personality_info, user_info):
        self.client = OpenAI(api_key=api_key)
        self.personality_info = personality_info
        self.user_info = user_info
    def generate_article_image(self,title):
        response = self.client.images.generate(
            model="dall-e-3",
            prompt=f"Title of article: {title}. Can you make an abstract image that resembles the title, slightly cartoonish.",
            #rectangular image
            size="1792x1024",
            n=1,
        )

        image_url = response.data[0].url
        return image_url

    def _generate_message(self, task_description, max_tokens=256):
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": f"About you: {self.personality_info}\n\nUser Information: {self.user_info}\n\nTask: {task_description}"
                },
                {
                    "role": "user",
                    "content": "",
                }
            ],
            temperature=1,
            max_tokens=max_tokens,
            top_p=1,
            frequency_penalty=0.57,
            presence_penalty=0.57
        )
        return response.choices[0].message.content

    def generate_introduction(self, task_info):
        return self._generate_message(task_info, max_tokens=256)

    def generate_article_header(self, paper_title, paper_abstract):
        task_description = f"You are currently coming up with a short title (under 6 words) for the newsletter article. The article is based on the following information. With the information below come up with a short captivating, and eye-catching title for the article: {paper_title} \n\n{paper_abstract}. Write it in sentence case"
        return self._generate_message( task_description, max_tokens=30)

    def generate_article_content(self, paper_content, header):
        task_description = f"Task: You are currently writing the content for the newsletter article. The article's header is {header}. Here is some improtant information from the paper to transform into the article contnent given below. Can you write a 3 paragraph newsletter article based on this information that is engaging and follows your writting style above"
        return self._generate_message(task_description + paper_content+ "Example: Here is an example: The Los Angeles County medical examiner’s office on Friday ruled the drowning death of Friends star Matthew Perry in October was due to “the acute effects of ketamine.” The 54-year-old Perry battled addiction for decades and detailed in his memoir how he was using ketamine as part of his treatment for depression and anxiety.Now Perry’s death, which was also determined to be an accident, has put greater attention on ketamine, a drug that has proven to be an effective mental health treatment but poses risks in recreational and unregulated settings.Ketamine’s journey to health aidThe drug’s origins date to the 1970s as an injectable anesthetic for humans and animals. It took a circuitous route to becoming a breakthrough treatment for mental health.In the 1990s, ketamine—known as “Special K”—emerged as a popular party drug thanks to its hallucinogenic qualities.In 1999, it became a Schedule III nonnarcotic substance under the Controlled Substances Act. Schedule III drugs are defined by the Drug Enforcement Administration as having a “moderate to low potential for physical and psychological dependence.”In 2006, researchers at the National Institutes of Health showed that an intravenous dose of ketamine could relieve severe depression in a matter of hours.In 2019, the FDA approved a nasal spray called esketamine, which is derived from ketamine and used for treatment-resistant depression.The main difference between medicinal and recreational use of ketamine is the dosage, which is much higher when it’s used as an anesthetic or illicitly. The dangers of home useEsketamine must be administered by a healthcare professional in a clinical setting. Perry’s autopsy report said the ketamine in his system could not have been from his last known ketamine therapy session, which was about a week and a half before he died. Online providers started prescribing ketamine for home use during the pandemic, thanks to relaxed federal rules on remote prescriptions. Although ketamine overdoses are rare, the drug’s ability to render a subject unconscious with too high of a dose without supervision has led to accidental deaths. Big picture: Investors have written big checks to startups aiming to treat mental illness with psychedelics, and Silicon Valley elites such as Elon Musk reportedly use ketamine, LSD, and other mind-expanding drugs recreationally. Dr. Gerard Sanacora, director of Yale University’s depression-research program, told the WSJ that Perry’s death “should be a wake-up call that ketamine needs to be used appropriately.", max_tokens=4000)


    

# Personalilites
IsabellaClarke = "You are an email newsletter reporter named Dr. Isabella Clarke. You combines scholarly insight with authoritative clarity. Your style, both academic and accessible, simplifies complex research without losing its substance. You write with meticulous precision, transforming academic concepts into engaging narratives. Your tone, confident yet welcoming, guides readers through enlightening journeys in knowledge. Your use of rich vocabulary and clear structure makes her writing appealing to a broad audience, fostering a love for learning."
LeoHart = "You are an email newsletter reporter named Leo Hart. You have mastered the art of friendly and engaging knowledge-sharing. Your style is informal and conversational, akin to chatting with a well-informed friend. You excels in making complex topics approachable, skillfully turning jargon into fun, easy-to-understand insights. You use analogies, everyday examples, and clear explanations to demystify intricate subjects, avoiding oversimplification. Your writing is an entertaining mix of humor, storytelling, and fascinating facts, making learning both enjoyable and enlightening."
SamiraByte = "You are an email newsletter reporter named Samira Byte. Your writing style is marked by its efficiency and directness, ideal for readers who appreciate concise communication. Your approach cuts straight to the heart of research, avoiding unnecessary embellishments. Every word and sentence in your writing is purposefully chosen to maximize information while minimizing excess. This brevity enhances comprehension without compromising content quality. Your tone is confident and authoritative, making you a reliable source for clear, factual information. Your writing is like a focused beam, highlighting the essentials without distraction."

user_info = "A Beginier to Healthcare, and aritifical intelligence. Provide more broad sumaries and explain in simple terms."


api_key = "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"

assistant = NewsletterAssistant(api_key, SamiraByte, user_info)

paperContent = ""
#convert txt file to string
with open("flask-server/paper.txt", "r") as f:
    paperContent = f.read()
    #add new content to string
    paperContent += "\n" + paperContent


# Generating different parts of the newsletter
introduction = assistant.generate_introduction("Task:Compose an introduction for \"The Research Digest,\" a daily newsletter, highlighting the content of today's issue.\n Newsletter Content for Today (December 19th, 2023):Swapping DNA Letters Like Scrabble Tiles,The AI Classroom Revolution: The Future of Education,AI Breakthrough: Solving Math's Toughest Puzzles\n Additional Information: Date: December 19th, 2023 (Tuesday), Include references to relevant holidays or significant events on this date, Style: Engaging and informative, with bold keywords for emphasis, Character Limit: 300 characters, Focus: Avoid redundancy and direct description of the content\n Objective: Create an introduction paragraph that sets the tone for today's newsletter, encapsulating the essence of the topics covered in a captivating manner, while adhering to the specified length requirements and following your style of writting.\n Example: \nGood morning. Feel like you’ve been seeing a lot of Travis Kelce lately, even when he’s not playing football?\n\nYou’re not wrong: The Chiefs tight end/most famous boyfriend in the world has hawked products in more commercials during NFL games so far this season than any other celeb, with 375 ad appearances, according to iSpot. Kelce’s teammate Patrick Mahomes was in second place (341), followed by Kevin Miles, aka Jake from State Farm (247).\n\nBefore you ask, these deals were locked in before he started dating Taylor Swift, but advertisers ramped up Kelce’s exposure knowing they had marketing gold on their hands.")
paperTitle = 'DFUCare: Deep learning platform for diabetic foot ulcer detection, analysis, and monitoring'
paperAbstract = 'Diabetic foot ulcers (DFUs) are a severe complication among diabetic patients and often result in amputation and even mortality. Early recognition of infection and ischemia is crucial for improved healing, but current methods are invasive, time-consuming, and expensive. To address this need, we have developed DFUCare, a platform that uses computer vision and deep learning (DL) algorithms to noninvasively localize, classify, and analyze DFUs. The platform uses a combination of CIELAB and YCbCr color space segmentation with a pre-trained YOLOv5s algorithm for wound localization achieving an F1-score of 0.80 and an mAP of 0.861. Using DL algorithms to identify infection and ischemia, we achieved a binary accuracy of 79.76% for infection classification and 94.81% for ischemic classification on a validation set. DFUCare also measures wound size and performs tissue color and textural analysis to allow comparative analysis of macroscopic features of the wound. We tested DFUCare performance in a clinical setting to analyze the DFUs collected using a cell phone camera. DFUCare successfully segmented the skin from the background, localized the wound with less than 10% error, and predicted infection and ischemia with less than 10% error. This innovative approach has the potential to deliver a paradigm shift in diabetic foot care by providing a cost-effective, remote, and convenient healthcare solution.'

article_header = assistant.generate_article_header(paperTitle, paperAbstract)
#article_content = assistant.generate_article_content(paperContent,article_header)

#print("Introduction:" + introduction + "\n")
#print("Header:" + article_header + "\n")
#print("Content:" + article_content + "\n")
print("Image Link:" + assistant.generate_article_image(article_header))

