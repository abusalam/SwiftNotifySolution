using Microsoft.EntityFrameworkCore;

namespace MessagingAPI.Models;

public class MessageContext : DbContext
{
    public MessageContext(DbContextOptions<MessageContext> options)
        : base(options)
    {
    }

    public DbSet<MessageItem> MessageItems { get; set; } = null!;
}