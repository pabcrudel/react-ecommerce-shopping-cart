import PropTypes from 'prop-types';

const GITHUB_PROFILE_URL = 'https://github.com/pabcrudel';
const GITHUB_ISSUES_PATH = '/issues';
const GITHUB_LICENSE_PATH = '/blob/main/LICENSE.md';

export default function Footer ({ repositoryName }) {
  const issuesUrl =
    GITHUB_PROFILE_URL +
    `/${repositoryName}` +
    GITHUB_ISSUES_PATH;

  const licenseUrl =
    GITHUB_PROFILE_URL +
    `/${repositoryName}` +
    GITHUB_LICENSE_PATH;

  return (
    <footer>
      <header>
        <section id="social-media-links">
          <h3 className="title">Social media links</h3>
          <nav>
            <ul>
              <li>
                <a
                  href={GITHUB_PROFILE_URL}
                  title="Overview of my GitHub Profile"
                >GitHub</a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/pablocrudelhom"
                  title="Take a look at my LinkedIn profile"
                >LinkedIn</a>
              </li>
            </ul>
          </nav>
        </section>

        <section id="report-issue">
          <h3 className="title">Report an Issue</h3>
          <p>
            If you found a bug or have a suggestion, please <a
              href={issuesUrl}
              title="Suggest me a change by creating an issue"
            >open an issue on GitHub</a>.
          </p>
        </section>
      </header>

      <aside id="copyright">
        <p>
          &copy; Copyright <time dateTime="2023">2023</time> Pablo Cru. <a
            href={licenseUrl}
            title="Take a look at the permissions, limitations and conditions"
          >MIT License</a>.
        </p>
      </aside>
    </footer>
  );
}

Footer.propTypes = {
  repositoryName: PropTypes.string.isRequired
};
