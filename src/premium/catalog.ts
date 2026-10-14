export type CatalogMode = 'online' | 'department';

export interface AcademyCourse {
  id: string;
  title: string;
  category: string;
  mode: CatalogMode;
  duration?: string;
  fee: string;
  enrollmentLabel: string;
}

const money = (fee: number) => `LKR ${fee.toLocaleString('en-LK')}`;
const onlineGroups: { category: string; entries: [string, number, number][] }[] = [
  { category: 'Language Courses', entries: [
    ['Certificate in English Language', 3, 4000],
    ['Certificate in Spoken English', 3, 4500],
    ['Certificate in Tamil Language', 2, 3500],
    ['Certificate in Sinhala Language', 2, 3500],
    ['Certificate in Arabic Language', 3, 5000],
    ['Certificate in English Grammar', 2, 3500],
  ] },
  { category: 'Psychology & Counselling', entries: [
    ['Certificate in Psychology', 3, 7999],
    ['Certificate in Psychology and Counselling', 3, 7999],
    ['Certificate in Child Psychology', 3, 6500],
    ['Certificate in Educational Psychology', 3, 6500],
    ['Certificate in Counselling Skills', 2, 5500],
    ['Certificate in Human Behaviour', 2, 5000],
  ] },
  { category: 'HRM & Administration', entries: [
    ['Certificate in Human Resource Management (HRM)', 3, 7500],
    ['Certificate in Business Administration', 3, 7000],
    ['Certificate in Office Administration', 2, 5000],
    ['Certificate in Recruitment and Selection', 2, 5500],
    ['Certificate in Leadership and Management', 3, 6500],
  ] },
  { category: 'Computer & IT', entries: [
    ['Professional Certificate in ICT', 3, 4000],
    ['Certificate in Microsoft Office', 3, 4500],
    ['Certificate in Microsoft Excel', 2, 3500],
    ['Certificate in Web Design', 3, 7500],
    ['Certificate in Computerised Accounting', 3, 7500],
  ] },
  { category: 'Design & Digital Media', entries: [
    ['Certificate in Graphic Design', 3, 4000],
    ['Certificate in Video Editing', 3, 6000],
    ['Certificate in Digital Marketing', 3, 6500],
    ['Certificate in Social Media Management', 2, 5000],
  ] },
  { category: 'Business & Professional Skills', entries: [
    ['Certificate in Entrepreneurship', 3, 6500],
    ['Certificate in Project Management', 3, 7500],
    ['Certificate in Customer Service', 2, 4500],
    ['Certificate in Communication Skills', 2, 4000],
  ] },
];

export const departments = [
  { category: 'Computer Fundamentals', number: '01', fee: 'LKR 4,500–6,000', titles: [
    'Computer Basics and IT Fundamentals', 'Introduction to Information Technology',
    'Computer Hardware and Maintenance', 'Computer Networking Fundamentals',
    'Internet and Digital Literacy', 'Operating Systems Fundamentals',
  ] },
  { category: 'Office Applications', number: '02', fee: 'LKR 3,500', titles: [
    'Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Microsoft Office Package',
    'Microsoft Access and Database Fundamentals',
  ] },
  { category: 'Programming and Software Development', number: '03', fee: 'LKR 6,000–8,000', titles: [
    'Introduction to Programming', 'Python Programming', 'C Programming', 'C++ Programming',
    'Java Programming', 'Software Development Fundamentals',
  ] },
  { category: 'Web Design and Development', number: '04', fee: 'LKR 6,000–8,000', titles: [
    'HTML and CSS', 'JavaScript Fundamentals', 'Website Design and Development',
    'Responsive Web Design', 'Full-Stack Web Development',
  ] },
  { category: 'Graphic Design and Digital Media', number: '05', fee: 'LKR 5,000–6,500', titles: [
    'Graphic Design Fundamentals', 'Adobe Photoshop', 'Adobe Illustrator', 'Video Editing', 'UI/UX Design Fundamentals',
  ] },
  { category: 'Digital Business and Marketing', number: '06', fee: 'LKR 5,000–7,000', titles: [
    'Digital Marketing', 'Social Media Marketing', 'Search Engine Optimization (SEO)',
    'Content Creation', 'Freelancing and Online Business Fundamentals',
  ] },
  { category: 'Emerging Technologies', number: '07', fee: 'LKR 10,000–15,000', titles: [
    'Artificial Intelligence Fundamentals', 'Generative AI Tools and Applications', 'Cybersecurity Fundamentals',
  ] },
];

export const onlineCourses: AcademyCourse[] = onlineGroups.flatMap(group => group.entries.map(([title, months, fee], index) => ({
  id: `online-${onlineGroups.indexOf(group)}-${index}`,
  title, category: group.category, mode: 'online' as const, duration: `${months} Months`, fee: money(fee),
  enrollmentLabel: `Online · ${title} · ${months} Months · ${money(fee)} (proposed)`,
})));

export const departmentCourses: AcademyCourse[] = departments.flatMap(group => group.titles.map((title, index) => ({
  id: `department-${group.number}-${index}`, title, category: group.category, mode: 'department' as const,
  fee: group.fee,
  enrollmentLabel: `Department ${group.number} · ${title} · ${group.fee} (proposed department fee; confirm course fee)`,
})));

export const enrollmentOptions = [...onlineCourses, ...departmentCourses].map(course => course.enrollmentLabel);
