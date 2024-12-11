import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 py-8">
        <div>
          <h1 className="text-4xl font-bold mb-8">About Our Store</h1>
          <p className="text-lg mb-4">
            Welcome to our e-commerce store! We&#39;re dedicated to providing you with a seamless shopping experience and high-quality products across various categories.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-semibold mb-6">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: "Wide Product Range",
            description: "Explore our extensive collection of products across multiple categories.",
          },
          {
            title: "User-Friendly Interface",
            description: "Enjoy a smooth and intuitive shopping experience with our easy-to-navigate website.",
          },
          {
            title: "Secure Transactions",
            description: "Shop with confidence knowing that your payments and personal information are protected.",
          },
        ].map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-3xl font-semibold mb-6">Coming Soon</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: "Customer Reviews",
            description: "Read and contribute product reviews to help make informed purchasing decisions.",
          },
          {
            title: "Personalized Recommendations",
            description: "Discover products tailored to your preferences and shopping history.",
          },
          {
            title: "Loyalty Program",
            description: "Earn points on your purchases and enjoy exclusive rewards and discounts.",
          },
        ].map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
        <p className="text-lg mb-6">
          We value your feedback and are always looking for ways to improve your shopping experience. If you have any questions, suggestions, or concerns, we&#39;d love to hear from you!
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/faq">FAQs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

