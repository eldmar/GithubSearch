// import { getUser, getFollowers } from "./api.js";
import { api } from "./api.js";
import { formatDate } from "./date.js";
import { showAlert, hideAlert } from "./alert.js";
import { debounce } from "./utils.js";

// DOM variables
const inputSearch = document.querySelector(".searchUser");
const profile = document.querySelector(".profile");

const showProfile = (
  {
    avatar_url,
    html_url,
    public_repos,
    public_gists,
    followers,
    following,
    company,
    blog,
    location,
    created_at,
  },
  followersList,
  reposList
) => {
  profile.innerHTML = `
        <div class="card card-body mb-3">
            <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid mb-2" src="${avatar_url}">
                    <a href="${html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                </div>

                <div class="col-md-9">
                    <span class="badge badge-primary">Public Repos: ${public_repos}</span>
                    <span class="badge badge-secondary">Public Gists: ${public_gists}</span>
                    <span class="badge badge-success">Followers: ${followers}</span>
                    <span class="badge badge-info">Following: ${following}</span>
                    <br><br>

                    <ul class="list-group">
                        <li class="list-group-item">Company: ${
                          company || "No company"
                        }</li>
                        <li class="list-group-item">Website/Blog: ${blog}</li>
                        <li class="list-group-item">Location: ${location}</li>
                        <li class="list-group-item">Member Since: ${formatDate(
                          created_at
                        )}</li>
                    </ul>
                </div>
            </div>
        </div>

        <h3 class="page-heading mb-3">Followers</h3>
        <div class="followers"></div>

        <h3 class="page-heading mb-3">Latest Repos</h3>
        <div class="repos"></div>
    `;

  const followersElement = document.querySelector(".followers");
  const reposElement = document.querySelector(".repos");
  const reposContainer = document.createElement("ul");
  const list = document.createElement("ul");

  followersList.forEach((follower) => {
    const li = document.createElement("li");
    li.textContent = follower.login;
    list.append(li);
  });

  reposList.forEach((repos) => {
    const li = document.createElement("li");
    li.textContent = repos.name;
    reposContainer.append(li);
  });
  followersElement.append(list);
  reposElement.append(reposContainer);
};

const clearProfile = () => {
  profile.innerHTML = "";
};

const handleInput = async ({ target: { value } }) => {
  try {
    // Ховати карточку користувача
    clearProfile();
    // Ховати повідомлення про помилку
    hideAlert();

    const inputValue = value.trim();
    if (!inputValue) {
      return;
    }

    const user = await api.getUser(inputValue);
    // const followers = await api.getFollowers(inputValue, 6);
    // const repos = await api.getRepos(inputValue);

    // Promise.all
    const [repos, followers] = await Promise.all([
      api.getRepos(inputValue),
      api.getFollowers(inputValue, 6),
    ]);

    showProfile(user, followers, repos);
  } catch (error) {
    showAlert(error.message, "danger", 2000);
  }
};

// Event listeners
inputSearch.addEventListener("input", debounce(handleInput, 1500));
