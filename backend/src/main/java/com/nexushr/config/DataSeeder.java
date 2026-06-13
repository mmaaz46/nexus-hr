package com.nexushr.config;

import com.nexushr.entity.User;
import com.nexushr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@gmail.com";

        List<User> admins = userRepository.findAllByEmail(adminEmail);
        if (admins.isEmpty()) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("123456"));
            admin.setRole("ADMIN");

            userRepository.save(admin);
        } else if (admins.size() > 1) {
            userRepository.deleteAll(admins.subList(1, admins.size()));
        }
    }
}
