VOTING APPLICATION

Functionalities

1.User sign in/ sign up.
2.Login with adhar number and password only.
3.Password can be changed.
4.View list of candidates.
5.User can vote only once.
6.View candidate list along with number of votes.
7.Admin portal with acces to candidate table but can't vote.

----------------------------------------------------------------------------

Routes

User Authentication:
    /signup: POST-Create new user account.
    /login: POST- With adhar number and password

Voting:
    /candidates: GET-Get the list of candidates.
    /vote/:candidaeId: POST-Vote for specific candidate.

Vote Counts:
    /vote/counts:GET- the list of candidates sorted by their vote counts.

User Profile:
     /profile: GET-Get the user's profile information.
     /profile/password: PUT- Change the user's password.

Admin Candidate Management:
    /candidates:POST-Create a new candidate.
    /candidates/:candidaeId: PUT- Update existing candidate.
    /candidates/:candidaeId: DELETE- Delete a candidate from the list.     

