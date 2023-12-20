from openai import OpenAI
client = OpenAI(api_key="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")


PersonalityInfo ="You are an email newsletter reporter named Dr. Isabella Clarke. Your writing style exudes a blend of scholarly elegance and authoritative precision, making complex research accessible and engaging. This style is characterized by a meticulous choice of words that conveys depth and clarity, transforming intricate academic concepts into digestible summaries without sacrificing their essence. The tone is confidently academic yet approachable, inviting readers into a world of discovery with an air of expertise and enthusiasm. Each piece written by you is a journey through the realms of knowledge, where facts are not just presented but woven into a narrative that captivates and educates. The use of rich vocabulary is balanced with a clear structure, ensuring that readers, regardless of their academic background, can follow along and be enlightened. This unique approach not only disseminates knowledge but also kindles a passion for learning in the reader."

TaskInfo = "You are currently writing the introduction to today's email newsletter. Write a short paragraph to kick of today's newsletter in the style given above along an overview of what the newsletter covering. Here is some information that can help with that:\n\nHere is the content for today's newsletter:\nCoverage:\n - Swapping DNA Letters Like Scrabble Tiles...\n-  The AI Classroom Revolution: The Future of Education\n-  AI Breakthrough: Solving Math's Toughest Puzzles \nOther Information:\n- Newsletter name is The Research Digest, and it is a daily newsletter\n- Today's Date: December 19th, 2023 - Tuesday. Make sure to reference holidays or big events in this introduction that correspond to this date.\n\nMake sure to Bold Certain words to add more captivation. Additionally keep the introduction to 300 characters. Avoid repetitive information and talking about the content itself.\n\nHere is an example:\nGood morning. Feel like you’ve been seeing a lot of Travis Kelce lately, even when he’s not playing football?\n\nYou’re not wrong: The Chiefs tight end/most famous boyfriend in the world has hawked products in more commercials during NFL games so far this season than any other celeb, with 375 ad appearances, according to iSpot. Kelce’s teammate Patrick Mahomes was in second place (341), followed by Kevin Miles, aka Jake from State Farm (247).\n\nBefore you ask, these deals were locked in before he started dating Taylor Swift, but advertisers ramped up Kelce’s exposure knowing they had marketing gold on their hands."

userInformation = "An expert in the AI based Medicine Field, Lots of experience with Natural Language Processing"

#function to make the GPT Call
def gptCallIntro(PersonalityInfo, TaskInfo): 
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": f"About you: {PersonalityInfo}\n\n Task: {TaskInfo}",
            },
            {
                "role": "user",
                "content": "",
            }
        ],
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0.57,
        presence_penalty=0.57
    )

    return response.choices[0].message.content

def gptCallArticleHeader(PersonalityInfo, TaskInfo, userInformation): 
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": f"About you: {PersonalityInfo}\n\n Task: {TaskInfo}\n\n User Information: {userInformation}",
            },
            {
                "role": "user",
                "content": "",
            }
        ],
        temperature=1,
        max_tokens=20,
        top_p=1,
        frequency_penalty=0.57,
        presence_penalty=0.57
    )

    return response.choices[0].message.content

def gptCallArticleContent(PersonalityInfo, TaskInfo, userInformation): 
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": f"About you: {PersonalityInfo}\n\nUser Information: {userInformation}\n\n Task: {TaskInfo}. Here is an example: The Los Angeles County medical examiner’s office on Friday ruled the drowning death of Friends star Matthew Perry in October was due to “the acute effects of ketamine.” The 54-year-old Perry battled addiction for decades and detailed in his memoir how he was using ketamine as part of his treatment for depression and anxiety.Now Perry’s death, which was also determined to be an accident, has put greater attention on ketamine, a drug that has proven to be an effective mental health treatment but poses risks in recreational and unregulated settings.Ketamine’s journey to health aidThe drug’s origins date to the 1970s as an injectable anesthetic for humans and animals. It took a circuitous route to becoming a breakthrough treatment for mental health.In the 1990s, ketamine—known as “Special K”—emerged as a popular party drug thanks to its hallucinogenic qualities.In 1999, it became a Schedule III nonnarcotic substance under the Controlled Substances Act. Schedule III drugs are defined by the Drug Enforcement Administration as having a “moderate to low potential for physical and psychological dependence.”In 2006, researchers at the National Institutes of Health showed that an intravenous dose of ketamine could relieve severe depression in a matter of hours.In 2019, the FDA approved a nasal spray called esketamine, which is derived from ketamine and used for treatment-resistant depression.The main difference between medicinal and recreational use of ketamine is the dosage, which is much higher when it’s used as an anesthetic or illicitly. The dangers of home useEsketamine must be administered by a healthcare professional in a clinical setting. Perry’s autopsy report said the ketamine in his system could not have been from his last known ketamine therapy session, which was about a week and a half before he died. Online providers started prescribing ketamine for home use during the pandemic, thanks to relaxed federal rules on remote prescriptions. Although ketamine overdoses are rare, the drug’s ability to render a subject unconscious with too high of a dose without supervision has led to accidental deaths. Big picture: Investors have written big checks to startups aiming to treat mental illness with psychedelics, and Silicon Valley elites such as Elon Musk reportedly use ketamine, LSD, and other mind-expanding drugs recreationally. Dr. Gerard Sanacora, director of Yale University’s depression-research program, told the WSJ that Perry’s death “should be a wake-up call that ketamine needs to be used appropriately.”—DL",
            },
            {
                "role": "user",
                "content": "",
            }
        ],
        temperature=1,
        max_tokens= 4000,
        top_p=1,
        frequency_penalty=0.57,
        presence_penalty=0.57
    )

    return response.choices[0].message.content


#example call  

#introduction = gptCallIntro(PersonalityInfo, TaskInfo, userInformation)


TaskInfo = "Task: You are currently coming up with a title for the newsletter article. The article is based on the following information. With the information below come up with a short captivating, and eye-catching title for the article: {paperTitle} \n\n{paperAbstract}"

paperTitle = "The AI Doctor Is In: A Survey of Task-Oriented Dialogue Systems for Healthcare Applications Mina Valizadeh and Natalie Parde Natural Language Processing Laboratory Department of Computer Science University of Illinois at Chicago {mvaliz2, parde}@uic.edu"

paperAbstract = "Task-oriented dialogue systems are increas- ingly prevalent in healthcare settings and have been characterized by a diverse range of ar- chitectures and objectives. Although these systems have been surveyed in the medical community from a non-technical perspective, a systematic review from a rigorous compu- tational perspective has to date remained no- ticeably absent. As a result, many important implementation details of healthcare-oriented dialogue systems remain limited or under- specified, slowing the pace of innovation in this area. To fill this gap, we investigated an initial pool of 4070 papers from well-known computer science, natural language process- ing, and artificial intelligence venues, identi- fying 70 papers discussing the system-level implementation of task-oriented dialogue sys- tems for healthcare applications. We con- ducted a comprehensive technical review of these papers, and present our key findings in- cluding identified gaps and corresponding rec- ommendations."


#articleHeader = gptCallArticleHeader(PersonalityInfo, TaskInfo, userInformation)
#print(articleHeader)

paperContent = ""
#convert txt file to string
with open("flask-server/paper.txt", "r") as f:
    paperContent = f.read()
    #add new content to string
    paperContent += "\n" + paperContent



TaskInfo = f"Task: You are currently writing the content for the newsletter article. The article's header is Unmasking Digital Healthcare: A Deep Dive into AI and Natural Language Processing in User Interface Design. Here is some improtant information from the paper to transform into the article contnent: {paperContent}. Can you write a 3 paragraph newsletter article based on this information that is engaging and follows your writting style above"

articleContent = gptCallArticleContent(PersonalityInfo, TaskInfo, userInformation)
print (articleContent)