import React from 'react'
import PageWrapper from '../../components/PageWrapper'

function page() {
    return (
        <PageWrapper>
            <div className='mt-40 m-10 md:m-35'>
                <h1 className="text-3xl font-bold mb-8 text-center">Contact Me</h1>
                <div className='bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto'>
                    <form action="https://formspree.io/f/mojwdpqr" method="POST">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-secondary mb-2">Name</label>
                            <input type="text" id="name" name="name" className="w-full p-2 border border-muted rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-secondary mb-2">Email</label>
                            <input type="email" id="email" name="email" className="w-full p-2 border border-muted rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-secondary mb-2">Message</label>
                            <textarea id="message" name="message" rows={5} className="w-full p-2 border border-muted rounded-lg" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary/90 transition-colors">Send Message</button>
                    </form>
                </div>
            </div>
        </PageWrapper>
    )
}

export default page