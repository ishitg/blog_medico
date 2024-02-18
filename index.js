import express from "express";
import bodyParser  from "body-parser";
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("public"));  
app.use(bodyParser.urlencoded({extended: true}));

let posts = [];

function Post(title, content) {
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}

function addPost(title, content) {
    let post = new Post(title, content);
    posts.push(post);
}

// Delete Post
function deletePost(index) {
    posts.splice(index, 1);
}
// Edit Post
function editPost(index, title, content) {
    posts[index] = new Post(title, content);
}




app.get("/",(req,res)=>{
    res.render("home.ejs",{posts: posts});
});

app.get("/view",(req,res)=>{
    res.render("view.ejs");
});



app.get("/view/:id",(req,res)=>{
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs",{postId: index,title: post.title,content: post.content });
});

// Delete Post
app.post("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});

// Edit Post Page
app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId: index, title: post.title, content: post.content});
});

// Update
app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});

// Create Post Page
app.get("/create", (req, res) => {
    res.render("create.ejs");
});

// Save Post
app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    
    addPost(title, content);
    res.redirect("/");
});

let blog1 = "<p class="+ "\"fs-5 my-4\"" + ">Intermittent fasting has garnered attention for its potential health benefits, but could it extend to combating serious diseases like breast cancer? Recent research shows promise, suggesting specific fasting methods might impact breast cancer risk factors. Let's explore the science and what this means for prevention strategies." + "<br>" + "<br>" + "<b>Section 1: What is Intermittent Fasting?</b>" + "<br>" + "<br>" +"Explanation: Brief definition of different intermittent fasting approaches (time-restricted eating, alternate-day fasting, etc.)." + "<br>" +  "Key Point: Focus on how fasting differs from standard calorie restriction approaches." + "<br>" + "<br>" + "<b>Section 2: The Science Behind Fasting and Cancer</b>" + "<br>" + "<br>" +  "<em>How it Could Work:</em> Explain the biological mechanisms proposed: reducing inflammation, improving insulin sensitivity, and influencing cellular processes related to cancer growth." + "<br>" + "<em>Research Focus:</em> Summarize key studies on animal models and human trials linking fasting to breast cancer specifically." + "<br>" + "<em>Important Note:</em> Emphasize that this is an active research area, and larger, longer-term studies are needed." + "<br>" + "<br>" + "<b>Section 3: Practical Takeaways - Is Fasting Right for Everyone?</b>" + "<br>" + "<br>" + "<b>Not a One-Size-Fits-All:</b> Emphasize individual medical consultation prior to trying fasting" + "<br>" + "<b>Potential Downsides:</b> Mention potential side effects like temporary fatigue, especially for those with other health conditions." + "<br>" + "<b>Lifestyle First:</b> Promote the importance of an overall healthy diet and exercise alongside any consideration of fasting.</p>";
let blog2 = "<p class="+ "\"fs-5 my-4\""+ "><b>Mental Well-being:</b> The pandemic disrupted routines and social connections. A sense of control through greater autonomy helps children develop coping mechanisms and resilience during uncertain times." + "<br>" + "<b>Reduced Stress for Parents:</b> Giving kids space to act independently lessens the burden on parents who likely juggle working from home with supervising remote learning. It creates opportunities for parental self-care, which further benefits the whole family." + "<br>" + "<b>Building Life Skills:</b> The \"new normal\" requires children to adjust and manage change. Providing opportunities for autonomy strengthens problem-solving and decision-making skills that serve them long-term." + "<br>" + "<b>Learning Responsibility:</b> When children manage their own tasks or schedule, they develop responsibility and ownership over their actions." + "<br>" + "<br>" + "<em><b>How to Foster Autonomy within Safe Boundaries</b></em>" + "<br>" + "<br>" + "<b>" + "Age-Appropriate Choices:" + "</b>" + "Instead of dictating every aspect of the day, provide choices to increase kids' sense of control:" + "<br>" + "\"Would you like to work on math or reading first?\"" + "<br>" + "\"Do you want a banana or an apple for snack?\"" + "<br>" + "\"Which game would you like to play during free time?\"" + "<br><br>" + "<b>Offer Guidance, Not Control:</b> When faced with problems, gently guide children toward solutions rather than stepping in to solve the issues instantly. Ask open-ended questions: <br>\"What are some good ways to approach this challenge?\" <br> \"Can you think of any other ways to do this?\" <br><br> <b>Let Responsibility Match Capability:</b> Allow kids to take on tasks aligned with their age and skill level. Start small (making their bed) and build responsibility (making simple snacks, helping with chores).<br><br> <b>Embrace (Safe) Exploration:</b> Depending on age, allow safe spaces to explore independence:<br> Unsupervised play<br> Neighborhood walk or bike ride (with rules and boundaries)<br> Time for independent hobbies or reading<br><br> <b>Be Open to Failure:</b> Kids sometimes make mistakes. Avoid overly harsh criticism. Instead, focus on what they can learn and improve for next time.<br><br> <em><b>Important Considerations:</b></em> <br><br> <b>Safety First:</b> Clearly communicate rules about health, home safety, internet use, and interactions with others. <br> <b>Stay Connected:</b> Autonomy isn't isolation. Be sure to have regular family time, check-ins, and open conversations about feelings and experiences.<br> <b>Adjust as Needed:</b> Every child is different. Some require more support, while others might thrive with minimal intervention. Customize these guidelines for your child's specific needs.</p>";
let blog3 = "<p class="+ "\"fs-5 my-4\"" + ">The liver is an extraordinary powerhouse, working to filter toxins, process nutrients, and support overall health. However, habits like binge eating and excessive alcohol consumption can significantly strain this vital organ, sometimes leading to serious consequences.<br><br> <b>The Binge Combo: Why It's Toxic to the Liver</b> <br><br><b>Binge Eating: Overloading with Calories:</b> When you indulge in large, calorie-dense meals, especially those rich in carbohydrates and unhealthy fats, your liver converts excess calories into fat. Over time, this leads to fatty liver disease, a precursor to more severe liver damage.<br><br> <b>Excessive Alcohol: Double Trouble:</b> The liver plays a key role in metabolizing alcohol. Binge drinking overwhelms the liver, generating harmful byproducts that cause inflammation and cell damage. Alcohol further contributes to fat build-up, amplifying the damage.<br> <b>A Dangerous Recipe:</b> Binge eating and drinking together multiply the risks for your liver. Alcohol decreases its ability to process other substances, creating a metabolic backlog that puts extra strain on the organ.<br><br> <b>Stages of Liver Damage</b> <br><br> <b> Fatty Liver (Steatosis):</b> Fat accumulation in liver cells is the initial stage. Often reversible with lifestyle changes.<br> <b>Alcoholic Hepatitis:</b> Inflammation in the liver caused by excessive alcohol consumption. Symptoms can include fever, jaundice, and abdominal pain.<br><b>Fibrosis:</b> Scarring of the liver as a result of chronic inflammation. This stage makes it harder for the liver to function normally.<br><b> Cirrhosis:</b> Severe scarring interferes with liver function, leading to potentially life-threatening complications.<br><br> <b>Not Just About Quantity</b><br><br> The damaging effects of binge eating and drinking on your liver can occur even if you don't consider yourself a heavy drinker or frequent binge eater. Even short episodes can overwhelm your liver's capacity, increasing long-term damage risks.<br><br> <b> Beyond the Liver: The Domino Effect</b><br><br> The harm inflicted on the liver extends far beyond the organ itself:<br><br> <b>Increased risk of other diseases:</b> Liver damage leaves you more vulnerable to heart disease, diabetes, kidney problems, and some forms of cancer. <b>Mental health struggles:</b> Liver diseases can affect mood, focus, and lead to fatigue and even depression.<br><br> <b> Protecting Your Liver</b><br><br> The good news is that it's possible to reduce the risk and even reverse early stages of liver damage:<br><br> Moderate alcohol consumption: Stick to safe drinking guidelines established by health organizations.<br> A healthy diet: Focus on fruits, vegetables, whole grains, and limit processed foods, sugary drinks, and unhealthy fats.<br> Regular exercise: Aim for at least 30 minutes of moderate-intensity exercise most days of the week.<br> Maintain a healthy weight: If you're overweight or obese, gradual weight loss is beneficial for your liver. <br><br><b>Warning Signs to Watch For</b><br><br> It's often possible to have liver damage without any obvious symptoms in the early stages. Pay attention to potential indicators:<br><br> Jaundice (yellowing of skin or eyes) <br>Abdominal pain and swelling<br> Nausea and vomiting <br>Fatigue<br> Easy bruising or bleeding<br><br> <b>Talk to Your Doctor</b><br><br> If you're concerned about your eating or drinking habits or experience any of the warning signs, it's crucial to consult your doctor. They can assess your liver health and recommend appropriate interventions."
app.listen(port,()=>{
   
    addPost("Exploring Intermittent Fasting: Could It Reduce Breast Cancer Risk?",blog1);
    addPost("Why Autonomy is Crucial During the Pandemic",blog2);
    addPost("How Binge Eating and Drinking Harm Your Liver",blog3);
    console.log(`Server running on port ${port}.`);
})
