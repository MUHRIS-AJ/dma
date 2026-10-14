import { useState } from "react";
import { ArrowUpRight, Star, Check, MapPin } from "lucide-react";
import { config, track } from "../config";
import "./community.css";

export function AcademyCommunity() {
  const [rating, setRating] = useState(5),
    [draft, setDraft] = useState("");
  return (
    <>
      <section className="section academy-values" id="why-us">
        <div>
          <span className="eyebrow">LEARN SKILLS. BUILD YOUR FUTURE.</span>
          <h2>
            A real place.
            <br />
            <em>A world of possibilities.</em>
          </h2>
          <p>
            Practical IT education, professional skills and career development
            in Sungawila Junction, Polonnaruwa. Learn through structured
            lessons, guided activities and work you can put into practice.
          </p>
          <div className="value-pills">
            <span>
              <Check size={15} /> Practical learning
            </span>
            <span>
              <Check size={15} /> Clear course information
            </span>
            <span>
              <Check size={15} /> Support for curious minds
            </span>
          </div>
          <a
            className="underlined-link"
            href="https://www.google.com/maps/search/?api=1&query=Digitalmod+Academy+Sungavila+Polonnaruwa"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={16} /> Find the academy <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="story-frames">
          <img
            src="/media/story-1.webp"
            width="960"
            height="540"
            loading="lazy"
            alt="Digital MOD Academy supplied cinematic brand visual"
          />
          <img
            src="/media/story-2.webp"
            width="960"
            height="540"
            loading="lazy"
            alt="Digital MOD Academy supplied educational brand visual"
          />
          <small>
            Academy brand visuals · Contact us to arrange a campus visit.
          </small>
        </div>
      </section>
      <section className="section" id="certificates">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR LEARNING, RECOGNISED</span>
            <h2>
              A milestone
              <br />
              <em>worth working towards.</em>
            </h2>
          </div>
          <p>
            Explore supplied certificate samples. Eligibility, assessment,
            issuing arrangements and recognition must be confirmed for your
            chosen course.
          </p>
        </div>
        <div className="certificate-gallery">
          {[1, 2, 3].map((n) => (
            <a
              key={n}
              href={`/media/certificate-${n}.webp`}
              target="_blank"
              rel="noreferrer"
              className="glass"
            >
              <img
                src={`/media/certificate-${n}.webp`}
                alt={`Academy certificate sample ${n}`}
                loading="lazy"
                width="1000"
                height="700"
              />
              <span>
                Certificate sample 0{n} <ArrowUpRight size={16} />
              </span>
            </a>
          ))}
        </div>
        <p className="sample-note">
          Samples illustrate document design. They do not establish
          accreditation or guarantee a qualification. Contact the academy for
          certificate verification.
        </p>
      </section>
      <section className="section feedback-section" id="feedback">
        <div>
          <span className="eyebrow">YOUR VOICE SHAPES OUR CLASSROOM</span>
          <h2>
            Tell us what worked.
            <br />
            <em>And what could be better.</em>
          </h2>
          <p>
            Studied with Digitalmod Academy? Share your experience directly with
            the team. Reviews are not published automatically. The academy will
            seek your permission before sharing your words publicly.
          </p>
          <div className="glass feedback-note">
            <MessageMark />
            <p>
              Honest feedback. Better learning.
              <br />
              Your experience matters to us.
            </p>
          </div>
        </div>
        <form
          className="glass enroll-form"
          onChange={() => setDraft("")}
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            setDraft(
              `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Digitalmod Academy — Student feedback\nName: ${f.get("reviewer")}\nCourse: ${f.get("reviewCourse")}\nRating: ${rating}/5\nFeedback: ${f.get("feedback")}\nPlease contact me before publishing this review.`)}`,
            );
            track("form_submit", {
              form_id: "feedback",
              delivery_status: "draft_prepared",
            });
          }}
        >
          <h3>Share your experience</h3>
          <fieldset className="rating-field">
            <legend>Your rating</legend>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                aria-label={`Rate ${n} out of 5`}
                aria-pressed={rating === n}
                onClick={() => {
                  setRating(n);
                  setDraft("");
                }}
              >
                <Star
                  size={23}
                  fill={n <= rating ? "#FFD700" : "transparent"}
                  color="#FFD700"
                />
              </button>
            ))}
          </fieldset>
          <label htmlFor="reviewer">
            Your name
            <input
              id="reviewer"
              name="reviewer"
              required
              minLength={2}
              maxLength={80}
              placeholder="Full name"
              autoComplete="name"
            />
          </label>
          <label htmlFor="reviewCourse">
            Your course
            <input
              id="reviewCourse"
              name="reviewCourse"
              required
              maxLength={130}
              placeholder="Course you studied"
            />
          </label>
          <label htmlFor="feedbackText">
            Your feedback
            <textarea
              id="feedbackText"
              name="feedback"
              required
              minLength={10}
              maxLength={1500}
              rows={4}
              placeholder="What was your learning experience like?"
            />
          </label>
          <button className="button primary" type="submit">
            Prepare feedback <ArrowUpRight size={17} />
          </button>
          {draft && (
            <p className="form-success" role="status">
              Your feedback is ready.{" "}
              <a
                href={draft}
                target="_blank"
                rel="noreferrer"
                data-cta="feedback_whatsapp"
              >
                Send on WhatsApp ↗
              </a>
            </p>
          )}
        </form>
      </section>
    </>
  );
}
function MessageMark() {
  return (
    <span className="quote-mark" aria-hidden="true">
      “
    </span>
  );
}
