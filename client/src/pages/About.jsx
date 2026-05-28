import { FiCheckCircle, FiServer, FiDatabase, FiLayout, FiCode, FiTarget, FiCompass } from 'react-icons/fi';

const About = () => {
    const stack = [
        { icon: FiLayout, title: 'Frontend', text: 'React.js and Tailwind CSS', color: 'bg-primary-100 text-primary-700' },
        { icon: FiServer, title: 'Backend', text: 'Node.js and Express.js', color: 'bg-secondary-100 text-secondary-800' },
        { icon: FiDatabase, title: 'Database', text: 'MongoDB', color: 'bg-emerald-100 text-emerald-700' },
        { icon: FiCode, title: 'Authentication', text: 'JWT and bcrypt.js', color: 'bg-rose-100 text-rose-700' },
    ];

    return (
        <div className="page-surface min-h-screen">
            <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
                <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80&blend=111827&sat=-25&exp=8&blend-mode=multiply"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
                    <p className="text-sm font-bold uppercase tracking-widest text-secondary-300">About the project</p>
                    <h1 className="mt-4 text-4xl font-heading font-black tracking-tight text-white sm:text-6xl">About AstraQuiz</h1>
                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-100">
                        AstraQuiz is a MERN-based assessment platform built to make digital testing feel organized, trustworthy, and calm.
                    </p>
                </div>
            </section>

            <main className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                <section className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-primary-700">Why it exists</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                            A cleaner way to run tests from creation to result review.
                        </h2>
                        <div className="mt-6 space-y-5 text-lg leading-8 text-gray-600">
                            <p>
                                AstraQuiz replaces scattered exam workflows with one connected space for teachers and students. Teachers create timed assessments, students attempt them in a focused interface, and results become available without slow manual evaluation.
                            </p>
                            <p>
                                The platform keeps the academic workflow practical: secure access, scheduled availability, automatic objective grading, and readable analytics for performance review.
                            </p>
                        </div>
                        <blockquote className="mt-10 rounded-lg bg-white p-6 text-xl font-bold leading-8 text-gray-950 shadow-sm ring-1 ring-stone-200">
                            "The goal is not just to digitize exams. The goal is to make every result easier to trust and easier to act on."
                        </blockquote>
                    </div>

                    <aside className="rounded-lg border border-stone-200 bg-white p-8 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-950">Project Team</h3>
                        <div className="mt-6 space-y-6">
                            <div>
                                <p className="font-semibold text-primary-700">Developed By</p>
                                <ul className="mt-3 space-y-2 text-gray-700">
                                    {['Vishwas Chourasiya', 'Satyam Kumar', 'Satyam Pyasi'].map((name) => (
                                        <li key={name} className="flex items-center">
                                            <FiCheckCircle className="mr-2 text-primary-600" />
                                            {name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="border-t border-stone-200 pt-6">
                                <p className="text-sm text-gray-500">MCA 3rd Semester</p>
                                <p className="text-sm font-bold text-gray-950">Shri Ram Institute of Technology</p>
                            </div>
                        </div>
                    </aside>
                </section>

                <section className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="rounded-lg border border-primary-100 bg-white p-8 shadow-sm">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                            <FiCompass className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-950">Vision</h3>
                        <p className="mt-4 leading-7 text-gray-600">
                            Build a dependable digital assessment environment where institutions can conduct fair tests and students can focus on learning outcomes.
                        </p>
                    </div>
                    <div className="rounded-lg border border-secondary-100 bg-white p-8 shadow-sm">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100 text-secondary-800">
                            <FiTarget className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-950">Mission</h3>
                        <p className="mt-4 leading-7 text-gray-600">
                            Simplify online exams with clear interfaces, secure role-based access, quick grading, and analytics that support better academic decisions.
                        </p>
                    </div>
                </section>

                <section className="mt-24">
                    <div className="mb-12 text-center">
                        <p className="text-sm font-bold uppercase tracking-widest text-primary-700">Technology</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                            Built with a focused MERN stack.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {stack.map((item) => (
                            <div key={item.title} className="rounded-lg border border-stone-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                                <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${item.color}`}>
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-gray-950">{item.title}</h3>
                                <p className="mt-2 text-sm text-gray-600">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;
