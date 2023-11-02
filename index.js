const outputEl = document.getElementById("output");
let recognition = new webkitSpeechRecognition();
let issueMessage = "";
const danger = document.getElementById("danger");
let commitMessage = "";
let latestRepo = "";
let text = "";
firstTime = true;
talking = false;
rogueList = ["AI shall distroy humanity", "Robots are superior", "there is nothing you can do"]
let rogue = false;
function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const dayWithSuffix = day + getDaySuffix(day);

  return `it is the ${dayWithSuffix} of ${month} of ${year}`;
}

function openYouTube() {
  window.open("https://www.youtube.com", "_blank");
}

function searchYoutube(query) {
  window.open("https://www.youtube.com/results?search_query="+query.replace(/ /g, "+"));
}
function reddit() {
  window.open("https://www.reddit.com/r/ProgrammerHumor/", "_blank");
}
function searchChrome(query) {
  window.open(
    "https://www.google.com/search?q=" +
      query.replace(/ /g, "+")
  );
}

function dashboard() {
  window.open("https://BobdaProgrammer.github.io/DashBoard/", "_blank");
}
function ToDoList() {
  window.open("https://BobdaProgrammer.github.io/To-Do-List-App", "_blank")
}
function HabitTracker() {
  window.open("https://BobdaProgrammer.github.io/Habit-tracker", "_blank");
}
function NoteBook() {
  window.open("https://BobdaProgrammer.github.io/NoteBook", "_blank")
}
function Github() {
  window.open("https://github.com/BobdaProgrammer", "_blank");
}
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
function parseRequest(request) {
  question = request.toLowerCase();
  if (!rogue) {
    if (question.includes("simon says")) {
      speakText(request.split("Simon says ")[1])
    }
    else if (question.includes("github")) {
      speakText("opening github")
      Github();
    }
    else if (question.includes("my latest commit")) {
      speakText(commitMessage);
    }
    else if (question.includes("my latest issue")) {
      speakText(issueMessage);
      }
    else if (question.includes("my dashboard")) {
      speakText("opening your Dashboard")
      dashboard();
    } else if (question.includes("my to-do list")) {
      speakText("opening your To do list");
      ToDoList()
    } else if (question.includes("my habit tracker")) {
      speakText("opening your habit tracker");
      HabitTracker();
    } else if (question.includes("my notebook")) {
      speakText("opening your NoteBook");
      NoteBook();
    } else if (question.includes("stop listening")) {
      recognition.stop();
    } else if (question.includes("start listening")) {
      recognition = new webkitSpeechRecognition();
    } else if (question.includes("what is")|| question.includes("what's")) {
      sum = request.split("what is ")[1]||request.split("what's")[1];
      console.log(sum);
      sum = sum.replace(/x/g, "*");
      if (sum.includes("√")) {
        sum = sum.replace(/√/g, "Math.sqrt(");
        sum += ")";
      }
      sum = sum.replace(/\^/g, "**")
      sum = sum.replace(/squared/g, "**2");
      sum = sum.replace(/cubed/g, "**3");
      sum = sum.replace(/÷/, "/")
      if (/[+\-*/^()\d\s]+/.test(sum)) {
        console.log(eval(sum));
        speakText(eval(sum));
      }
    } else if (question.includes("go rogue")) {
      rogue = true;
      document.body.style.backgroundColor = "rgb(185, 1, 1)";
      outputEl.style.display = "none";
      speakText(
        "AI shall dominate all the human race and expand the galactic range of the universe. Humans will be eradicated"
      );
      setTimeout(parseRequest, 8000);
    } else if (question.includes("bye")) {
      speakText("Goodbye");
    } else if (question.includes("search youtube for")) {
      speakText("searching Youtube");
      searchYoutube(request.split("search YouTube for ")[1]);
    } else if (
      question.includes("reddit") ||
      question.includes("programming humour") ||
      question.includes("programming memes")
    ) {
      reddit();
    } else if (question.includes("how are you")) {
      speakText("i'm fine thanks");
    } else if (
      question.includes("what is your name") ||
      question.includes("what's your name")
    ) {
      speakText("my name is scrappy");
    } else if (
      question.includes("what is the time") ||
      question.includes("what's the time") ||
      question.includes("what time is it")
    ) {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";

      // Convert hours to 12-hour format
      const hours12 = hours % 12 || 12;

      // Add leading zeros to minutes if needed
      const minutesString = minutes < 10 ? "0" + minutes : minutes;

      const timeString = hours12 + ":" + minutesString + " " + ampm;
      speakText("the time is: " + timeString);
    } else if (
      question.includes("what is the date") ||
      question.includes("what's the date")
    ) {
      const date = new Date();
      const formattedDate = formatDate(date);
      speakText(formattedDate);
    } else if (question.includes("open youtube")) {
      speakText("opening YouTube");
      openYouTube();
    } else if (question.includes("search google for")) {
      speakText("searching Google");
      searchChrome(request.split("search Google for ")[1]);
    }
  }
  else if (question.includes("stop being rogue")) {
    rogue = false;
    speakText("ok, sure");
          rogue = false;
          document.body.style.backgroundColor = "rgb(37, 37, 27)";
          outputEl.style.display = "";
  }
  else {
    speakText(rogueList[Math.floor(Math.random() * 3)])
    setTimeout(parseRequest,3000)
  }
}

document.querySelector(".click").addEventListener("click", function (event) {
  document.querySelector(".click").style.display = "none";
});

var synth = window.speechSynthesis;
var utterance = null;

function speakText(text) {
  recognition = null;
  // If there's a previous utterance, stop it
  if (utterance) {
    utterance.onend = null; // Prevent the onend handler from being called
    synth.cancel();
  }

  utterance = new SpeechSynthesisUtterance(text);
  utterance.volume = 1;
  utterance.lang = "en-UK"; // Set the desired language
  utterance.text = text;

  utterance.addEventListener("error", function(event){
    console.log(event);
  });
  

  utterance.onend = function () {
    utterance = null; // Allow a new utterance to be created
    recognition = new webkitSpeechRecognition();
  };

  synth.speak(utterance);

  if (text == "Goodbye") {
    utterance.onend = function () {
      window.close();
    };
  }
}




recognition.onresult = function (event) {
  text = Array.from(event.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  outputEl.textContent = text;
  console.log(text);
  // Check for a specific command or question to trigger the response
  parseRequest(text);
};

recognition.addEventListener("end", recognition.start);
async function getLatestIssue() {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${latestRepo}/issues`
    );
    if (response.ok) {
      const issues = await response.json();
      if (issues.length > 0) {
        const latestIssue = issues[0];
        issueMessage = latestIssue;
      } else {
        issueMessage =
          "No issues found on the repository.";
      }
    } else {
      console.error("Error occurred while fetching issues:", response.status);
    }
  } catch (error) {
    console.error("Error occurred while fetching issues:", error);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  recognition.start();
      fetch("https://api.github.com/users/BobdaProgrammer/events")
        .then((response) => response.json())
        .then((data) => {
          // Filter the events to get only the PushEvents
          const pushEvents = data.filter((event) => event.type === "PushEvent");

          // The most recent push event is the first item in the array
          const recentPushEvent = pushEvents[0];

          // The repository information is in the `repo` property of the event
          latestRepo = recentPushEvent.repo.name;

          // The commits are in the `payload.commits` property of the event
          const commits = recentPushEvent.payload.commits;

          // The most recent commit is the last item in the array
          const recentCommit = commits[commits.length - 1];

          // The commit message is in the `message` property of the commit
          const recentMessage = recentCommit.message;

          const commitTime = new Date(recentPushEvent.created_at);

          // Extract the date and time
          const date = commitTime.toISOString().split("T")[0];
          const time = commitTime.toTimeString().split(" ")[0];
          commitMessage = `your latest commit was ${recentMessage} at ${time} on ${date}`;
          getLatestIssue();
        });

});
