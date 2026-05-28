import { Link } from 'react-router-dom';
import { FiCheckCircle, FiShield, FiTrendingUp, FiClock, FiUsers, FiEdit3, FiBarChart2 } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
    const { user } = useAuth();

    const features = [
        {
            icon: FiShield,
            title: 'Guarded access',
            text: 'Role-based login keeps teacher tools, student attempts, and result views neatly separated.',
        },
        {
            icon: FiClock,
            title: 'Time-aware tests',
            text: 'Live countdowns keep every attempt fair, focused, and automatically submitted when time runs out.',
        },
        {
            icon: FiEdit3,
            title: 'Fast test creation',
            text: 'Teachers can compose questions, set schedules, add points, and publish without heavy setup.',
        },
        {
            icon: FiTrendingUp,
            title: 'Instant evaluation',
            text: 'Objective responses are graded as soon as a student submits, reducing manual checking work.',
        },
        {
            icon: FiUsers,
            title: 'Role-fit dashboards',
            text: 'Students see what to attempt next while teachers track tests, submissions, and performance.',
        },
        {
            icon: FiBarChart2,
            title: 'Readable analytics',
            text: 'Scores, pass rates, attempts, and answer reviews are shaped for quick academic decisions.',
        },
    ];

    const teacherSteps = ['Build the assessment', 'Schedule the test window', 'Publish for students', 'Review scores and submissions'];
    const studentSteps = ['Open assigned tests', 'Answer within the timer', 'Submit with confidence', 'Review performance insights'];

    return (
        <div className="relative overflow-hidden">
            <section className="relative isolate min-h-[92vh] overflow-hidden bg-ink pt-24 pb-16 sm:pb-20 lg:pt-32">
                <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80&blend=111827&sat=-20&exp=8&blend-mode=multiply"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-canvas to-transparent" />

                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
                    <div className="max-w-3xl">
                        <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-secondary-200 backdrop-blur">
                            Smart assessment studio for modern classrooms
                        </p>
                        <h1 className="text-4xl font-heading font-black tracking-tight text-white sm:text-6xl">
                            AstraQuiz
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-100">
                            Create polished tests, run timed attempts, and turn every submission into clear insight. AstraQuiz keeps online exams structured, secure, and easy to understand for both teachers and students.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            {user ? (
                                <Link
                                    to={user.role === 'teacher' ? '/teacher' : '/student'}
                                    className="rounded-full bg-primary-500 px-8 py-3.5 text-sm font-bold text-ink shadow-lg shadow-primary-500/30 transition hover:-translate-y-1 hover:bg-primary-400"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className="rounded-full bg-primary-500 px-8 py-3.5 text-sm font-bold text-ink shadow-lg shadow-primary-500/30 transition hover:-translate-y-1 hover:bg-primary-400"
                                    >
                                        Start Free
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="rounded-full border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="self-end rounded-[2rem] border border-white/15 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-xl">
                        <div className="rounded-lg bg-white p-5 text-gray-900">
                            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary-700">Live Exam</p>
                                    <h2 className="text-xl font-bold">Data Structures Quiz</h2>
                                </div>
                                <span className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-bold text-secondary-800">28:14</span>
                            </div>
                            <div className="mt-5 space-y-3">
                                {['Answer validation ready', '42 students invited', 'Auto grading enabled'].map((item) => (
                                    <div key={item} className="flex items-center rounded-lg bg-stone-50 p-3 text-sm font-semibold text-gray-700">
                                        <FiCheckCircle className="mr-3 text-primary-600" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <blockquote className="mt-6 rounded-lg bg-ink p-5 text-sm font-semibold leading-6 text-white">
                                "Assessment should measure learning, not patience with complicated software."
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-canvas py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-bold uppercase tracking-widest text-primary-700">Built for clarity</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                            Everything an online assessment needs, without visual clutter.
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-gray-600">
                            AstraQuiz balances structure and speed: teachers get reliable test controls, students get a focused attempt screen, and results stay transparent.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.title} className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-950">{feature.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-gray-600">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-ink py-24 text-white">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-2 lg:px-8">
                    <WorkflowCard title="For Teachers" steps={teacherSteps} accent="primary" />
                    <WorkflowCard title="For Students" steps={studentSteps} accent="secondary" />
                </div>
            </section>

            <section className="bg-primary-700 py-16">
                <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
                    <blockquote className="text-2xl font-bold leading-10 text-white sm:text-3xl">
                        "A good test does more than produce marks. It shows the next honest step."
                    </blockquote>
                    <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-primary-100">AstraQuiz learning principle</p>
                </div>
            </section>
        </div>
    );
};

const WorkflowCard = ({ title, steps, accent }) => {
    const color = accent === 'primary' ? 'bg-primary-500 text-ink' : 'bg-secondary-400 text-ink';

    return (
        <div className="rounded-lg border border-white/10 bg-white/10 p-8 backdrop-blur">
            <h3 className="text-2xl font-bold">{title}</h3>
            <div className="mt-8 space-y-4">
                {steps.map((step, index) => (
                    <div key={step} className="flex items-center rounded-lg bg-white/10 p-4">
                        <span className={`mr-4 flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${color}`}>
                            {index + 1}
                        </span>
                        <span className="font-semibold text-gray-100">{step}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Landing;
