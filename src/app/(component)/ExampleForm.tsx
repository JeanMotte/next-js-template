"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, TextField, Box } from "@mui/material";
import { toast } from "react-toastify";

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function ExampleForm() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { name: "", email: "" },
	});

	const onSubmit = (data: FormData) => {
		console.log(data);
		toast.success("Form submitted successfully!");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box display="flex" flexDirection="column" gap={2} width="300px">
				<Controller
					name="name"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Name"
							variant="outlined"
							error={!!errors.name}
							helperText={errors.name?.message}
						/>
					)}
				/>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label="Email"
							variant="outlined"
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
					)}
				/>
				<Button type="submit" variant="contained" color="primary">
					Submit
				</Button>
			</Box>
		</form>
	);
}