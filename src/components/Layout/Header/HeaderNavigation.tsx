import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/Ui/NavigationMenu";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import * as React from "react";

const levels: { title: string; href: string }[] = [
	{
		title: "Very Easy",
		href: "/levels/very-easy",
	},
	{
		title: "Easy",
		href: "/levels/easy",
	},
	{
		title: "Medium",
		href: "/levels/medium",
	},
	{
		title: "Hard",
		href: "/levels/hard",
	},
	{
		title: "Very Hard",
		href: "/levels/very-hard",
	},
];

const themes: { title: string; href: string }[] = [
	{
		title: "ビジネス",
		href: "/themes/business",
	},
	{
		title: "旅行",
		href: "/themes/trip",
	},
	{
		title: "健康",
		href: "/themes/health",
	},
	{
		title: "教育",
		href: "/themes/education",
	},
	{
		title: "日常生活",
		href: "/themes/daily-life",
	},
	{
		title: "環境",
		href: "/themes/environment",
	},
	{
		title: "エンターテイメント",
		href: "/themes/entertainment",
	},
	{
		title: "アートと文学",
		href: "/themes/art-and-literature",
	},
	{
		title: "歴史",
		href: "/themes/",
	},
];

const personals: { title: string; href: string }[] = [
	{
		title: "作成した文章",
		href: "/dashboard/texts",
	},
	{
		title: "あとで翻訳",
		href: "/dashboard/afterward",
	},
	{
		title: "翻訳した文章",
		href: "/dashboard/flag",
	},
	{
		title: "いいね",
		href: "/dashboard/good",
	},
	{
		title: "メモ",
		href: "/dashboard/memo",
	},
	{
		title: "使用した英単語",
		href: "/words",
	},
	{
		title: "学習記録",
		href: "/user",
	},
];

export function HeaderNavigation() {
	const { data: session } = useSession();
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Levels</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="w-64">
							{levels.map((level) => (
								<ListItem
									key={level.title}
									title={level.title}
									href={level.href}
								/>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Themes</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="w-64">
							{themes.map((theme) => (
								<ListItem
									key={theme.title}
									title={theme.title}
									href={theme.href}
								/>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				{session && (
					<NavigationMenuItem className="animate-fade-in">
						<NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="w-64">
								{personals.map((personal) => (
									<ListItem
										key={personal.title}
										title={personal.title}
										href={personal.href}
									/>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				)}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
