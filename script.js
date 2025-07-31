// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Add to calendar functionality
document.getElementById('addToCalendarBtn').addEventListener('click', function (e) {
    e.preventDefault();

    // Create event details
    const event = {
        title: 'Aisha & Mohammed Nikkah Ceremony',
        start: new Date('2024-05-25T19:30:00'),
        end: new Date('2024-05-25T23:00:00'),
        location: 'Islamic Center of Houston, 123 Main St, Houston, TX',
        description: 'Join us for the Nikkah ceremony of Aisha Khan and Mohammed Ali'
    };

    // Create .ics file
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'SUMMARY:' + event.title,
        'DTSTART:' + formatDate(event.start),
        'DTEND:' + formatDate(event.end),
        'LOCATION:' + event.location,
        'DESCRIPTION:' + event.description,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\n');

    // Download the file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'Nikkah-Ceremony.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

function formatDate(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.couple, .calendar, .map-container').forEach(el => {
    observer.observe(el);
});
